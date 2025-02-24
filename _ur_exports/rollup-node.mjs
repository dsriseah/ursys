/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  rollup config file for ursys node build

  Unlike the web build, this config is transorming .mts files to .mjs and .cjs
  and retaining the structure rather than bundling everything into one file.
  The entire directory will end up in someone's node_modules

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import commonjs from '@rollup/plugin-commonjs';
import typescript from 'rollup-plugin-typescript2';
import esbuild from 'rollup-plugin-esbuild';
import { nodeResolve } from '@rollup/plugin-node-resolve';

/// SIBLING IMPORTS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// rollup unresolved dependencies in _ur are resolved by this array
const ext_package = ['express', 'serve-index'];

/// BUILDERS //////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// this builder requires imports use .mjs instead of .mts
const tsBuilder = typescript({
  tsconfig: './tsconfig.node.json',
  filterRoot: false
});
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/// this builder allows use of .mts imports
const esBuilder = esbuild({
  target: 'ESNext',
  tsconfig: './tsconfig.node.json'
});

/// NODE ROLLUP CONFIG ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default [
  {
    input: '../_ur/node-server/@server.mts',
    output: [
      {
        dir: 'dist/core-node-esm',
        format: 'esm',
        preserveModules: true,
        entryFileNames: '[name].mjs',
        exports: 'named'
      },
      {
        dir: 'dist/core-node-cjs',
        format: 'cjs',
        preserveModules: true,
        entryFileNames: '[name].cjs',
        exports: 'named'
      }
    ],
    external: id => {
      const extern =
        id.startsWith('node:') || // Treat Node.js built-ins as external
        id.includes('node_modules'); // Avoid bundling dependencies
      const foreign = ext_package.includes(id);
      return extern || foreign;
    },
    plugins: [
      nodeResolve({
        extensions: ['.mts', '.ts'],
        preferBuiltins: true,
        rootDir: '../', // Ensure resolution from monorepo root
        moduleDirectories: ['node_modules'] // Resolve sibling deps
      }),
      commonjs(),
      esBuilder
    ]
  }
];
