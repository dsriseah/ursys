/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  The main @init.ts script is the entry point used by the bundler, in this
  case esbuild or tool that parses the import statements and builds a bundle
  from what it finds (e.g. webpack)

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { ClientTest } from './lib/test-library';

/// LIVE RELOAD ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
new EventSource('/esbuild').addEventListener('change', e => {
  const { added, removed, updated } = JSON.parse(e.data);
  if (!added.length && !removed.length && updated.length === 1) {
    for (const link of document.getElementsByTagName(
      'link'
    ) as HTMLCollectionOf<HTMLLinkElement>) {
      const url = new URL(link.href);
      if (url.host === location.host && url.pathname === updated[0]) {
        const next = link.cloneNode() as HTMLLinkElement;
        next.href = `${updated[0]}?${Math.random().toString(36).slice(2)}`;
        next.onload = () => link.remove();
        link?.parentNode?.insertBefore(next, link.nextSibling);
        return;
      }
    }
  }
  location.reload();
});

/// RUNTIME INIT //////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
globalThis.ClientTest = ClientTest;
