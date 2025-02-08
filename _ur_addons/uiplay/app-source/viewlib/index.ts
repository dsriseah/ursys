/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Web Component Declarations

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';
import UI_Frame from './webc/ui-frame.ts';
import UI_Rack from './webc/ui-rack.ts';
import UI_Panel from './webc/ui-panel.ts';
import UI_Group from './webc/ui-group.ts';
import NC_Login from './webc/nc-login.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('webc', 'TagGray');
const LOG = console.log.bind(console);

/// DECLARATIONS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function DeclareComponents() {
  LOG(...PR('Declaring components...'));
  NC_Login.DeclareCustomElement();
  UI_Frame.DeclareCustomElement();
  UI_Rack.DeclareCustomElement();
  UI_Panel.DeclareCustomElement();
  UI_Group.DeclareCustomElement();
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { DeclareComponents };
export { AttachRouter } from './router.ts';
