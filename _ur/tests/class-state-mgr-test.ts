/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Unit Tests for StateMgr

  API REFERENCE (dupe from class-statemgr.ts)

  state: groupName => TStateObj;
  sendState: TStateObj => void;
  subscribeState: TStateChangeFunc => void;
  unsubscribeState: TStateChangeFunc => void;
  queueEffect: TEffectFunc => void;

  INTERNAL API for APPCORE MANAGERS ONLY

  _initializeState: TStateObj => void;
  _setState: TStateObj => void;
  _insertStateEvent: (TStateObj, TEffectFunc) => void;
  _interceptState: TTapFunc => void;
  _isValidState: TStateObj => boolean;
  _mergeState: TStateObj => TStateObj;
  _notifySubs: TStateObj => void;
  _enqueue: TQueuedAction => void;
  _dequeue: void => void;
  _doEffect: void => void;

  STATIC API
  
  GetStateManager: groupName => StateMgr;
  GetStateData: groupName => TStateObj;
  GetInstance: groupName => StateMgr;

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { expect, test } from 'vitest';
import StateMgr from '../common/class-state-mgr.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const A: StateMgr = new StateMgr('StoreA');
const B: StateMgr = new StateMgr('StoreB');

/** stores may not share property names */
function noPropCollision() {
  try {
    A._initializeState({ name: 'henry', age: 25 });
    B._initializeState({ name: 'sally', age: 30 });
    // this shouldn't pass
    return false;
  } catch (err) {
    return true;
  }
}

/// TESTS /////////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
test('StateMgr instances can not share prop names', () => {
  expect(noPropCollision() === false);
});
