/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  ROLLUP TYPE DECLARATION CONFIGURATION
  used by npm build script to generate type declaration files for the project

  note: invoked from inside _ur directory

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import dts from 'rollup-plugin-dts';

export default [
  {
    input: './_dist/_types/node-server/@server.d.mts',
    output: {
      file: './_dist/server.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  },
  {
    input: './_dist/_types/web-client/@client.d.ts',
    output: {
      file: './_dist/client.d.ts',
      format: 'es'
    },
    plugins: [dts()]
  }
];
