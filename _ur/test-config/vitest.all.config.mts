import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['./**/test-*.ts', '../_ur_addons/**/test-*.ts']
  }
});
