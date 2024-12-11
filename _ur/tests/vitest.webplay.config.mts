/// <reference types="vitest" />
import { MakeConfig } from './vitest-console-filter.mts';
import { defineConfig } from 'vitest/config';

const config = MakeConfig([
  '../_ur_addons/webplay/**/*-test.mts',
  '../_ur_addons/webplay/**/*-test.ts',
  '../_ur_addons/webplay/**/test-*.mts',
  '../_ur_addons/webplay/**/test-*.ts'
]);

export default defineConfig(config);
