/// <reference types="vitest" />
import { MakeConfig } from './vitest-console-filter.mts';
import { defineConfig } from 'vitest/config';

const config = MakeConfig(['./**/test-*.ts', './**/*-test.ts']);

export default defineConfig(config);
