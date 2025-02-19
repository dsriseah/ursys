/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\
  
  Dummy NCNode

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import ControlGroup from './ui-group.ts';

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
  div[data-tabname] {
    padding: 1em;
    background-color: yellow;
  }
</style>
<ui-tabbed>
  <div data-tabname="Attributes">
    <ui-group group="attributes">
      <in-text name="notes"></in-text>
      <in-text name="tags"></in-text>
      <in-text name="provenance"></in-text>
      <in-text name="comments"></in-text>
      <in-text name="degrees"></in-text>
    </ui-group>
    <ui-group group="attributes">
      <ac-button name="delete">DELETE</ac-button>
      <ac-button name="edit">EDIT</ac-button>
    </ui-group>
  </div>
  <div data-tabname="Edges">
    <ui-group group="edges">
      <button>THIS NODE -> BOARDGAMES</button><br>
      <button>THIS NODE -> VIDEOGAMES</button><br>
      <button>THIS NODE -> MOVIES</button><br>
    </ui-group>
    <button>NEW EDGE</button>
  </div>
  <div data-tabname="Provenance">
    <display-group group="provenance">
      <ui-title>Provenance</ui-title>
      <hr>
      <ui-title>History</ui-title>
      <label for="created">Created</label><input type="text" name="created" value="2021-01-01"><br>
      <label for="updated">Updated</label><input type="text" name="updated" value="2021-01-01"><br>
    </display-group>
  </div>
</ui-tabbed>
<ui-metadata for="attributes">
  notes:
    label: "Notes OK"
    tooltip: "Notes for this node"
  tags:
    label: "Tags"
    tooltip: "Tags for this node"
  provenance:
    label: "Provenance"
    tooltip: "Provenance for this node"
  comments:
    label: "Comments"
    tooltip: "Comments for this node"
  degrees:
    label: "Degrees"
    tooltip: "Degrees of separation"
</ui-metadata>
<ui-metadata for="actions">
  edit:
    label: "Edit"
    tooltip: "Edit this node"
  cite:
    label: "Cite"
    tooltip: "Cite this node"
</ui-metadata>
    `;
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default NCNode;
