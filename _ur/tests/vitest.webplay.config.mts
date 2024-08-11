/// <reference types="vitest" />

import { defineConfig } from 'vitest/config';
import { makeTerminalOut } from '../common/util-prompts.ts';

const TERM = makeTerminalOut(' OUT', 'TagPurple');

TERM('current directory:', process.cwd());
export default defineConfig({
  test: {
    include: [
      '../_ur_addons/webplay/**/*-test.mts',
      '../_ur_addons/webplay/**/*-test.ts',
      '../_ur_addons/webplay/**/test-*.mts',
      '../_ur_addons/webplay/**/test-*.ts'
    ],
    watch: true,
    setupFiles: '../_ur/npm-scripts/@build-core-vitest.mts',
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): false | void {
      const lines = log.split('\n');
      for (const line of lines) {
        if (line === '') console.log('');
        else TERM(line);
      }
      return false; // do not log to console
    }
  }
});
