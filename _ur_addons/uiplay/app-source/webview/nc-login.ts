/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\
  
  
\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** generic token decoder interface */
type TokenData = {
  error?: string; // true for invalid token, message in hint
  hint?: string; // current decoded status
  parts?: string[]; // decoded parts of token
};
interface Validator {
  decodeToken(token: string): TokenData;
}
/** construction options */
interface LCConfig {
  validator: Validator;
}

/// HELPERS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** helper: decode a session token */
function decodeToken(token: string): TokenData {
  const parts = token.split('-');
  if (parts.length !== 3)
    return { error: 'invalid token', hint: 'must have 3 parts' };
  return { parts, hint: 'valid token' };
}

/// WEB COMPONENT /////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
class NCLoginControl extends HTMLElement {
  //
  validator: Validator;

  constructor() {
    super();
    // create shadow DOM
    const shadow = this.attachShadow({ mode: 'open' });
    shadow.innerHTML = `
    <div class="--NCLoginControl">
      <span>type your login token</span>
      <input name="sessionToken" type="text" placeholder="CLASSID-PROJID-CODE" />
      <button>LOGIN</button>
    </div>
    `;
    // attach event listeners
    const input = shadow.querySelector('input');
    input.addEventListener('input', this.onInput.bind(this));
    const button = shadow.querySelector('button');
    button.addEventListener('click', this.onSubmit.bind(this));
    // add styling
    const style = document.createElement('style');
    style.textContent = ``;
    shadow.appendChild(style);
    // is UR available?
    if (globalThis.UR) {
      console.log('UR is available');
    }
  }

  onInput(e: Event) {
    const input = e.target as HTMLInputElement;
    const token = input.value;
    if (this.validator) {
      console.log('validating token');
      const data = this.validator.decodeToken(token);
      const hint = data.error ? data.hint : 'valid token';
      input.title = hint;
    }
  }

  onSubmit(e: Event) {
    const input = this.shadowRoot.querySelector('input') as HTMLInputElement;
    const token = input.value;
    const data = this.validator.decodeToken(token);
    if (data.error) {
      alert(data.hint);
      return;
    }
    alert('login success');
  }

  /// STATIC METHODS //////////////////////////////////////////////////////////
  /// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
  static DeclareCustomElement(tag: string = 'nc-login') {
    customElements.define(tag, NCLoginControl);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default NCLoginControl;
