/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Web Component Declarations

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ConsoleStyler } from '@ursys/core';
import UR_UIFrame from './ui-frame.ts';
import UR_UIRack from './ui-rack.ts';
import UR_UIPanel from './ui-panel.ts';
import UR_UIControlGroup from './ui-control-group.ts';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PR = ConsoleStyler('webc', 'TagGray');
const LOG = console.log.bind(console);

/// DECLARATIONS //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function DeclareComponents() {
  LOG(...PR('Declaring components...'));
  customElements.define('ur-frame', UR_UIFrame);
  customElements.define('ur-rack', UR_UIRack);
  customElements.define('ur-panel', UR_UIPanel);
  customElements.define('ur-cgroup', UR_UIControlGroup);
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { DeclareComponents };
