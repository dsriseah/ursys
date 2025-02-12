/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\
  
  Dummy NCNode

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import ControlGroup from './control-group.ts';

/// WEB COMPONENT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class NCNode extends HTMLElement {
  //
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
<style>
  div[data-tab] {
    padding: 1em;
    background-color: yellow;
  }
</style>
<ui-tabbed>
  <div data-tab="Attributes">
    <control-group state-group="attributes">
      <in-text name="notes"></in-text>
      <in-text name="tags"></in-text>
      <in-text name="provenance"></in-text>
      <in-text name="comments"></in-text>
      <in-text name="degrees"></in-text>
      <in-button name="edit">EDIT</in-button>
      <in-button name="edit">DELETE</in-button>
    </control-group>
  </div>
  <div data-tab="Edges">
    <control-group state-group="edges">
      <button>THIS NODE -> BOARDGAMES</button><br>
      <button>THIS NODE -> VIDEOGAMES</button><br>
      <button>THIS NODE -> MOVIES</button><br>
    </control-group>
    <button>NEW EDGE</button>
  </div>
  <div data-tab="Provenance">
    <display-group state-group="provenance">
      <ui-title>Provenance</ui-title>
      <hr>
      <ui-title>History</ui-title>
      <label for="created">Created</label><input type="text" name="created" value="2021-01-01"><br>
      <label for="updated">Updated</label><input type="text" name="updated" value="2021-01-01"><br>
    </display-group>
  </div>
</ui-tabbed>
<control-meta for="Attributes">
  notes:
    placeholder: "Enter notes here"
  edit:
    label: "Edit"
    tooltip: "Edit this node"
  cite:
    label: "Cite"
    tooltip: "Cite this node"
</control-meta>
    `;
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default NCNode;
