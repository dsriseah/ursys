/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\
  
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

class UI_Panel extends HTMLElement {
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

    wrapper.textContent = 'Hello, I am a Panel component!';
    shadow.appendChild(style);
    shadow.appendChild(wrapper);
  }

  connectedCallback() {}

  disconnectedCallback() {}

  attributeChangedCallback(name, oldValue, newValue) {}

  /// STATIC METHODS //////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  static DeclareCustomElement(tag: string = 'ui-panel') {
    customElements.define(tag, UI_Panel);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default UI_Panel;
