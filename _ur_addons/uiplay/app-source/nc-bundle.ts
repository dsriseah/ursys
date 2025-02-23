// example of a bundle that is loaded after the main bundle
// by the router via data-viewjs attribute in the root element

import { ConsoleStyler } from '@ursys/core';

const PR = ConsoleStyler('ncbundle', 'TagCyan');
const LOG = console.log.bind(console);

LOG(...PR('loaded extra bundle'));
