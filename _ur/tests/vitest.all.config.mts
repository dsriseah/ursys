/// <reference types="vitest" />
import { defineConfig } from 'vitest/config';
import { makeTerminalOut } from '../common/util-prompts.ts';

const TERM = makeTerminalOut(' DBG', 'TagYellow');
const OUT = makeTerminalOut(' ---', 'TagGray');
export default defineConfig({
  test: {
    include: [
      './**/test-*.ts',
      './**/*-test.ts',
      '../_ur_addons/**/test-*.ts',
      '../_ur_addons/**/*-test.ts'
    ],
    onConsoleLog(log: string, type: 'stdout' | 'stderr'): false | void {
      const lines = log.split('\n');
      for (const line of lines) {
        if (line === '') console.log('');
        else if (line.startsWith('---')) OUT(line.slice(3).trim());
        else TERM(line);
      }
      return false; // do not log to console
    }
  }
});
