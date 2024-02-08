import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    include: ['../_ur_addons/**/test-*.ts']
  }
});
