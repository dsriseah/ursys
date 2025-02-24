import typescript from '@rollup/plugin-typescript';
import { nodeResolve } from '@rollup/plugin-node-resolve';

// Web Build
export default [
  {
    input: '../_ur/web-client/@client.ts',
    output: [
      { file: 'dist/core-web.esm.js', format: 'esm' },
      { file: 'dist/core-web.cjs.js', format: 'cjs' },
      {
        file: 'dist/core-web.amd.js',
        format: 'amd',
        name: 'UrsysCore'
      }
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
