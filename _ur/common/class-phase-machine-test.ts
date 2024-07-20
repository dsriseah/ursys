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
import PhaseMachine from './class-phase-machine.ts';

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let PM: PhaseMachine;

test('PhaseMachine should construct', () => {
  PM = new PhaseMachine('UR', {
    PHASE_INIT: ['INITIALIZE', 'DOM_READY', 'PRE_CONNECT', 'CONNECT', 'CONNECTED'],
    PHASE_CONFIG: ['LOAD_ASSETS', 'CONFIG_APP', 'CONFIG_START', 'APP_READY']
  });
  expect(PM).toBeDefined();
});

test('define hooks out of order, still executes in order', async () => {
  const out = [];
  PhaseMachine.Hook('UR/INITIALIZE', () => {
    out.push('INITIALIZE');
  });
  PhaseMachine.Hook('UR/PHASE_CONFIG', () => {
    out.push('PHASE_CONFIG');
  });
  PhaseMachine.Hook('UR/LOAD_ASSETS', async () => {
    await new Promise(resolve => setTimeout(resolve, 500));
    out.push('LOAD_ASSETS');
  });
  PhaseMachine.Hook('UR/APP_READY', () => {
    out.push('APP_READY');
  });

  await PM.execPhaseGroup('PHASE_INIT');
  expect(out).toEqual(['INITIALIZE']);
  await PM.execPhaseGroup('PHASE_CONFIG');
  const match = ['INITIALIZE', 'LOAD_ASSETS', 'APP_READY', 'PHASE_CONFIG'];
  console.log('>>> out', out);
  console.log('>>> mat', match);
  expect(out).toEqual(match);
});
