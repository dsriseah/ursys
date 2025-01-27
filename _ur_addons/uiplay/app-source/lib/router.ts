/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  SNA Router
  loads root views from the views directory, based on #hash.html
  also inserts css object into head matching #hash.css

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
let ROUTED_DIV: HTMLElement | null = null;
let DBG = true;
const LOG = console.log.bind(console);

/// HELPERS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** HELPER: route to the page */
async function m_HandleHashChange(event: HashChangeEvent) {
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
  // if no view is defined then we are done
  if (!view) {
    ROUTED_DIV.innerHTML = `[no default view defined in router]`;
    return;
  }
  const path = view;
  const res = await fetch(`views/${path}.html`);
  if (!res.ok) {
    console.error(`Failed to route to ${path}`);
    ROUTED_DIV.innerHTML = `[Unroutable Hash #${view}]`;
    return;
  }
  const html = await res.text();
  const viewElement = document.createElement('div');
  viewElement.innerHTML = html;

  // get the data-css and data-js attributes
  const viewRoot = viewElement.children[0];
  let cssFile = viewRoot.getAttribute('data-viewcss');
  let jsFile = viewRoot.getAttribute('data-viewjs');

  // insert a css load for the view
  if (cssFile) {
    if (cssFile.endsWith('.css')) cssFile = cssFile.slice(0, -4);
    const css = document.createElement('link');
    css.rel = 'stylesheet';
    css.href = `views/${cssFile}.css`;
    document.head.appendChild(css);
  } else if (DBG) LOG(`note: %cdata-viewcss optional css skipped`, 'color: darkblue');

  // insert a js file to the view itself
  if (jsFile) {
    if (jsFile.endsWith('.js')) jsFile = jsFile.slice(0, -3);
    const js = document.createElement('script');
    js.src = `/js/${jsFile}.js`;
    js.type = 'module';
    viewElement.appendChild(js);
  } else if (DBG)
    LOG(`note: %cdata-viewjs optional bundle skipped'`, 'color: darkblue');

  // replace the routed div with the new view
  ROUTED_DIV.replaceWith(viewElement);
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
function AttachRouter(e: HTMLElement, defaultHash?: string) {
  if (ROUTED_DIV) return; // already initialized
  window.addEventListener('hashchange', m_HandleHashChange);
  window.addEventListener('load', m_HandleHashChange);
  ROUTED_DIV = e;
  if (typeof defaultHash !== 'string') return;
  if (!defaultHash.startsWith('#')) console.warn('defaultHash must start with #');
  if (window.location.hash === defaultHash) return;
  window.location.hash = defaultHash;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { AttachRouter };
