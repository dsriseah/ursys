/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  constructor(shortName: string, phases: PhaseMap)
  
  hook(op: string, f: Function, scope?: string): void
  execute(op: string, ...args: any[]): Promise<any[]>
  executePhase(phaseName: string, ...args: any[]): Promise<void>
  executePhaseParallel(phaseName: string, ...args: any[]): Promise<any[]>
  
  getHookFunctions(op: string): Function[]
  getPhaseFunctionsAsMap(phaseName: string): Map<string, Function[]>
  getPhaseGroups(): string[]
  
  consolePhaseInfo(pr?: string, bg?: string): string
  
  static Hook(phaseSel: string, f: Function | undefined): void
  static GetMachineStates(): string

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test } from 'vitest';
import PhaseMachine from './class-phase-machine.ts';
import type { GroupOpList, PhaseMap } from './class-phase-machine.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PHASES = {
  BOOT: ['init', 'dom_ready'],
  LOAD: ['load_db', 'load_assets'],
  START: ['config', 'start', 'ready'],
  RUN: ['update', 'render']
};

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
test('class instance created', () => {
  const PM: PhaseMachine = new PhaseMachine('TestCreate', PHASES);
  expect(PM.constructor.name === 'PhaseMachine');
  const groups = PM.getPhaseGroupOps() as GroupOpList[];
  expect(Array.isArray(groups));
  expect(groups.length === 4);
  expect(groups[0].phaseOps.join()).toBe('init,dom_ready');
  expect(groups[1].phaseOps.join()).toBe('load_db,load_assets');
  expect(groups[2].phaseOps.join()).toBe('config,start,ready');
  expect(groups[3].phaseOps.join()).toBe('update,render');
});

test('phase hook declaration and execution', async () => {
  const PM: PhaseMachine = new PhaseMachine('TestExec', PHASES);
  const results = [];
  //
  PM.hook('init', () => results.push('init'));
  PM.hook('config', () => results.push('config'));
  //
  await PM.executePhase('BOOT');
  await PM.executePhase('LOAD');
  await PM.executePhase('START');
  await PM.executePhase('RUN');
  //
  expect(results.join()).toBe('init,config');
});

test('async phase execution', async () => {
  const PM: PhaseMachine = new PhaseMachine('TestAsync', PHASES);
  const results = [];
  //
  PM.hook('init', () => results.push('init'));
  PM.hook(
    'load_assets',
    () =>
      new Promise<void>(resolve => {
        setTimeout(() => {
          results.push('timeout');
          resolve();
        }, 1000);
      })
  );
  PM.hook('config', () => results.push('config'));
  //
  await PM.executePhase('BOOT');
  await PM.executePhase('LOAD');
  await PM.executePhase('START');
  await PM.executePhase('RUN');
  expect(results.join()).toBe('init,timeout,config');
});
