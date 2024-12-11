/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA Server Entry Point

  This is a server module entry point that's imported dynamically by
  @run-sna.mts. By the time this module is loaded, the webapp and appserver
  have already been built. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import PATH from 'node:path';
import { SNA, PR, FILE } from '@ursys/core';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { DataObj } from '@ursys/core';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = PR('server-ex', 'TagGreen');
let CONFIG: DataObj = {};

/// LIFECYCLE HOOKS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
SNA.HookServerPhase('SRV_READY', () => {
  LOG('SNA Server Component SRV_READY');
});

/// CONFIGURATION /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function PreConfig(config: DataObj) {
  // first add
  const { app_dir } = config;
  const runtime_dir = PATH.join(app_dir, '_test_runtime');
  const config_dir = PATH.join(app_dir, '_config');
  SNA.SetServerConfig({ runtime_dir, config_dir });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** load default configuration during lifecycle */
function PreHook() {
  const { config_dir } = SNA.GetServerConfig();
  const config_file = PATH.join(config_dir, 'default-config.json');
  /** Load default configuration */
  SNA.HookServerPhase('SRV_CONFIG', async () => {
    LOG('loading minimum config');
    if (!FILE.FileExists(config_file)) {
      LOG('default-config.json not found');
      return;
    }
    try {
      const jsonData = await FILE.AsyncReadJSON(config_file);
      if (!jsonData) {
        LOG('Error reading default-config.json');
        return;
      }
    } catch (e) {
      LOG('Error reading default-config.json', e);
    }
  });
}

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
(async () => {
  // Set extra global configuration
  // SNA.SetServerConfig({});
  // note: see @run-sna for more global configuration

  // Register extra components
  // SNA.UseComponent(Your_SNA_Module)
  SNA.UseComponent(
    SNA.NewComponent('server_extra', {
      PreConfig,
      PreHook
    })
  );

  // After all modules are initialized, start the SNA lifecycle this will
  // call PreConfig() and PreHook() all all registered modules.
  // SNA itself registers some modules (e.g. dataserver)
  await SNA.Start();
})();
