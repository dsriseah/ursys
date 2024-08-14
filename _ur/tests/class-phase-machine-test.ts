/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Unit Tests for PhaseMachine

  API REFERENCE (dupe from class-phase-machine.ts)
  Main API is through this static method:

  static Hook: (PM_HookSelector, PM_HookFunction, PM_HookEvent) => void;

  SUPPORTING METHODS:

  constructor: (PM_Name, PM_Definition) => void;
  addHook: (PM_PhaseID, PM_Hook) => void;
  executePhase: (PM_PhaseID) => Promise<void>;
  executePhaseGroup: (PM_PhaseGroup) => Promise<void>;
  consolePhaseInfo: (string, string) => string;
  set cur_phase: PM_PhaseID;
  set cur_group: PM_PhaseID;
  static GetMachineStates: () => string;

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test, vi } from 'vitest';
import PhaseMachine from '../common/class-phase-machine.ts';
import * as PROMPTS from '../common/util-prompts.ts';
const { makeTerminalOut } = PROMPTS;
const TERM = makeTerminalOut(' TEST', 'TagPink');

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let PM: PhaseMachine;

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:

  Test Initialization of PhaseMachine Instance. The PhaseMachine is 
  initialized with a name and a definition. Phases belong to Phase Groups.
  
  Currently, phases must be unique across the definition. In the future,
  phases will be allowed to be shared across multiple groups so a phase group
  could be considered as a "loop" or "cycle" of phases as seen in GEMSTEP.
  
:*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
test('construct and check phase selectors', () => {
  PM = new PhaseMachine('UR', {
    PHASE_INIT: ['INITIALIZE', 'DOM_READY', 'PRE_CONNECT', 'CONNECT', 'CONNECTED'],
    PHASE_CONFIG: ['LOAD_ASSETS', 'CONFIG_APP', 'CONFIG_START', 'APP_READY'],
    PHASE_ORDER: ['ORDER_0', 'ORDER_1'],
    PHASE_EVENT: ['EVENT_0', 'EVENT_1']
  });
  expect(PM).toBeDefined();
  // bad syntax
  expect(() => PM.hasHook('PUMPKIN')).toThrowError();
  expect(() => PM.hasHook('ur/INITIALIZE')).toThrowError();
  expect(() => PM.hasHook('ur/initialize')).toThrowError();
  expect(PM.hasHook('UR/INITIALIZE')).toBe(true);
  // exists in definition
  expect(PM.hasHook('UR/PHASE_INIT')).toBe(true);
  expect(PM.hasHook('UR/ORDER_0')).toBe(true);
  // doesn't exit
  expect(PM.hasHook('UR/PUMPKIN')).toBe(false);
  expect(PM.hasHook('RANDO/SOMETHING_PHASE')).toBe(false);
});

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:

  Test order of execution for PhaseGroups. Phases defined inside a phase
  must complete before the PhaseGroup is considered complete.
  
:*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
test('define hooks out of order, still executes in order', async () => {
  const out = [];
  PhaseMachine.HookPhase('UR/INITIALIZE', () => {
    out.push('INITIALIZE');
  });
  PhaseMachine.HookPhase('UR/PHASE_CONFIG', () => {
    out.push('PHASE_CONFIG');
  });
  PhaseMachine.HookPhase('UR/LOAD_ASSETS', async () => {
    await new Promise(resolve => setTimeout(resolve, 250));
    out.push('LOAD_ASSETS');
  });
  PhaseMachine.HookPhase('UR/APP_READY', () => {
    out.push('APP_READY');
  });
  await PhaseMachine.RunPhaseGroup('UR/PHASE_INIT');
  expect(out).toEqual(['INITIALIZE']);
  await PhaseMachine.RunPhaseGroup('UR/PHASE_CONFIG');
  const match = ['INITIALIZE', 'LOAD_ASSETS', 'APP_READY', 'PHASE_CONFIG'];
  expect(out).toEqual(match);
});

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:

  Within a Phase, the executor functions can either execute immediately or
  return a Promise. Test that the order of invocation and completion is
  as expected, running in parallel. Multiple ways of defining the promise.
  
:*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
test('expected execution order', async () => {
  const done = []; // completion order
  const invk = []; // invocation order

  // Hook Async 500 using async/await
  PhaseMachine.HookPhase('UR/ORDER_0', async () => {
    invk.push('500'); // invocation order
    await new Promise(resolve => setTimeout(resolve, 500));
    // note that this has to happen AFTER the promise resolves
    // otherwise it will push immediately
    done.push('500');
    expect(done).toEqual(['0', '250', '500']);
  });
  // Hook No Async
  PhaseMachine.HookPhase('UR/ORDER_0', () => {
    invk.push('0');
    done.push('0');
    expect(done).toEqual(['0']);
  });
  // Hook Async 250 using return Promise
  PhaseMachine.HookPhase('UR/ORDER_0', () => {
    invk.push('250');
    return new Promise(resolve => {
      setTimeout(() => {
        // note that this has to happen AFTER the promise resolves
        // otherwise it will push immediately
        done.push('250');
        expect(done).toEqual(['0', '250']);
        resolve();
      }, 250);
    });
  });
  await PhaseMachine.RunPhaseGroup('UR/PHASE_ORDER');
  expect(done).toEqual(['0', '250', '500']);
  expect(invk).toEqual(['500', '0', '250']);
});

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:

  PhaseMachines implement events in each phase: 'enter', 'exec', and 'exit'.
  When using HookPhase, the default is 'exec', but you can override it by 
  as follows. e.g. HookPhase('UR/INITIALIZE:enter). Then, when 
  RunPhaseGroup('UR/INITIALIZE') is called, all phases should execute in groups
  of 'enter', 'exec', and 'exit'.
  
:*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
test('expected phase events order', async () => {
  const done = []; // completion order
  const invk = []; // invocation order

  expect(done).toEqual([]);
  expect(invk).toEqual([]);

  // Hook No Async '1:enter'
  PhaseMachine.HookPhase('UR/EVENT_1:enter', () => {
    invk.push('1:enter');
    done.push('1:enter');
    expect(done).toEqual(['0:exec', '0:exit', '1:enter']);
  });
  // Hook No Async '0:exec'
  PhaseMachine.HookPhase('UR/EVENT_0:exec', () => {
    invk.push('0:exec');
    done.push('0:exec');
    expect(done).toEqual(['0:exec']);
  });
  // Hook Async '0:exit'
  PhaseMachine.HookPhase('UR/EVENT_0:exit', async () => {
    invk.push('0:exit');
    await new Promise(resolve => setTimeout(resolve, 500));
    done.push('0:exit');
    expect(done).toEqual(['0:exec', '0:exit']);
  });

  await PhaseMachine.RunPhaseGroup('UR/PHASE_EVENT');
});
