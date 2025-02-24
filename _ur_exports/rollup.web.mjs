/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  rollup config file for ursys web build

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import typescript from 'rollup-plugin-typescript2';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// Web Build
export default [
  {
    input: '../_ur/web-client/@client.ts',
    output: [
      { file: 'dist/core-web-umd.js', format: 'umd', name: 'UrsysCore' },
      { file: 'dist/core-web-iife.js', format: 'iife', name: 'UrsysCore' }
    ],
    plugins: [
      nodeResolve(),
      typescript({
        tsconfig: './tsconfig.web.json',
        filterRoot: false
      })
    ]
  }
];
