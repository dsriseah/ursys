/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  dc-comments is the client-side component of a comment module, which talks
  to srv-comments through URSYS

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';
import { Endpoint, HookPhase, AddMessageHandler } from '../webplay-svc-client.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('COMMENT', 'TagYellow');
const LOG = console.log.bind(console);

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  LOG(...PR('DC-Comments Initializing'));

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:
    APP_CONFIG allows data structures to initialize to starting values
  :*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  HookPhase('WEBPLAY/NET_REGISTER', () => {
    LOG(...PR('DC-Comments NetRegister'));

    // client implements these sync handlers
    AddMessageHandler('SYNC:DATA_CLIENT', (data: any) => {});
    AddMessageHandler('SYNC:STATE_CLIENT', async (data: any) => {});
  });

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:
    LOAD_DATA happens early to fetch critical data from wherever it's stored.
  :*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  HookPhase('WEBPLAY/LOAD_DATA', async () => {
    LOG(...PR('DC-Comments LoadData'));
    const request = {
      bagRef: 'comments'
    };
    await Endpoint()
      .netCall('SYNC:GET_DATA', request)
      .then(data => {
        LOG(...PR('DC-Comments Data got'), data);
      });
  });

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:
    APP_READY is when the app is ready to start running, but hasn't yet.
    Might be a good place to set up modes and initial user interface states.
  :*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  HookPhase('WEBPLAY/APP_READY', () => {
    LOG(...PR('DC-Comments AppReady'));
    // srv-comments implements message API
  });

  /*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*:
    APP_RUN is when the app is starting to run, used to start main processes.
  :*- - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -*/
  HookPhase('WEBPLAY/APP_RUN', () => {
    LOG(...PR('DC-Comments Running'));
    const EP = Endpoint();
    EP.netCall('NET:DC_HANDLER', { data: 'hello' }).then(data => {
      LOG(...PR('DC-Handler Response'), data);
    });
  });
})();

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {};
