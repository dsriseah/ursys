/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\
  
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class UI_Group extends HTMLElement {
  constructor() {
    super(); // Always call super first in constructor
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `<slot></slot>`;
    const wrapper = document.createElement('div');
    const style = document.createElement('style');

    style.textContent = `
      div { 
        background: tomato; 
        padding: 10px; 
        color: white; 
      }
    `;

    wrapper.textContent = 'Hello, I am a UI_Group component!';
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  /// STATIC METHODS //////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  static DeclareCustomElement(tag: string = 'ui-control-group') {
    customElements.define(tag, UI_Group);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default UI_Group;
