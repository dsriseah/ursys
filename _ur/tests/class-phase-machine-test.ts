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
test('PhaseMachine should construct', () => {
  PM = new PhaseMachine('UR', {
    PHASE_INIT: ['INITIALIZE', 'DOM_READY', 'PRE_CONNECT', 'CONNECT', 'CONNECTED'],
    PHASE_CONFIG: ['LOAD_ASSETS', 'CONFIG_APP', 'CONFIG_START', 'APP_READY'],
    PHASE_TEST: ['HOOK_0', 'HOOK_1', 'HOOK_2']
  });
  expect(PM).toBeDefined();
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
  await PM.execPhaseGroup('PHASE_INIT');
  expect(out).toEqual(['INITIALIZE']);
  await PM.execPhaseGroup('PHASE_CONFIG');
  const match = ['INITIALIZE', 'LOAD_ASSETS', 'APP_READY', 'PHASE_CONFIG'];
  expect(out).toEqual(match);
});

/*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:

  Within a Phase, the executor functions can either execute immediately or
  return a Promise. Test that the order of invocation and completion is
  as expected, running in parallel. Multiple ways of defining the promise.
  
:*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
test('test expected execution order', async () => {
  const done = []; // completion order
  const invk = []; // invocation order

  // Hook Async 500 using async/await
  PhaseMachine.HookPhase('UR/HOOK_0', async () => {
    invk.push('500'); // invocation order
    await new Promise(resolve => setTimeout(resolve, 500));
    // note that this has to happen AFTER the promise resolves
    // otherwise it will push immediately
    done.push('500');
    expect(done).toEqual(['0', '250', '500']);
  });
  // Hook No Async
  PhaseMachine.HookPhase('UR/HOOK_0', () => {
    invk.push('0');
    done.push('0');
    expect(done).toEqual(['0']);
  });
  // Hook Async 250 using return Promise
  PhaseMachine.HookPhase('UR/HOOK_0', () => {
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
  await PM.execPhaseGroup('PHASE_TEST');
  expect(done).toEqual(['0', '250', '500']);
  expect(invk).toEqual(['500', '0', '250']);
});
