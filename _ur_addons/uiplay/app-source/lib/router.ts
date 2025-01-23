/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA Router
  loads root views from the views directory, based on #hash.html
  also inserts css object into head matching #hash.css

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let ROUTED_DIV: HTMLElement | null = null;

/// HELPERS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: route to the page */
async function m_Route(event: HashChangeEvent) {
  // if ROUTED_DIV was already loaded, then we want to gracefully
  // remove the old content
  if (ROUTED_DIV?.children.length) {
    const children = [...ROUTED_DIV.children];
    children.forEach(e => e.remove());
  }
  // proceed to load the new content]
  const { error, hash, view, args, values } = m_DecodeHash();
  if (error) {
    ROUTED_DIV.innerHTML = `[Invalid Hash ${hash}]`;
    return;
  }
  const path = view || 'home';
  // insert a css load for the view
  const css = document.createElement('link');
  css.rel = 'stylesheet';
  css.href = `views/${path}.css`;
  document.head.appendChild(css);
  // load the html fragment
  const res = await fetch(`views/${path}.html`);
  if (!res.ok) {
    console.error(`Failed to route to ${path}`);
    ROUTED_DIV.innerHTML = `[Unroutable Hash #${view}]`;
    return;
  }
  const html = await res.text();
  ROUTED_DIV!.innerHTML = html;
  // load any scripts in the html
  const frag = document.createElement('div');
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: Decode location #hash/param/param
 *  returns params in-order, separated by slashes
 *  also scans for key/value pairs separate
 *  @returns { view: string, params: string[], values: { k: string, v: string }[] }
 */
function m_DecodeHash() {
  const hash = window.location.hash;
  const [hh, qq] = hash.split('?');
  const bits = hh.split('/');
  let [view, ...args] = bits;
  if (view.startsWith('#')) view = view.slice(1);
  // does args have any illegal '?', '&', '=' characters?
  let illegal = args.filter(
    p => p.includes('?') || p.includes('&') || p.includes('=')
  );
  if (illegal.length) return { error: 'invalid hash', hash };
  if (qq) {
    const params = new URLSearchParams(qq);
    const values = {};
    [...params].map(([k, v]) => (values[k] = v === '' ? true : v));
    return { hash, view, args, values };
  } else return { hash, view, args };
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: add handlers if not already added */
function AttachRouter(e: HTMLElement) {
  if (ROUTED_DIV) return; // already initialized
  window.addEventListener('hashchange', m_Route);
  window.addEventListener('load', m_Route);
  ROUTED_DIV = e;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { AttachRouter };
