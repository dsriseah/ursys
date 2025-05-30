/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URSYS Bare Module Template
  - for detailed example, use snippet 'ur-module-example' instead

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import FS from 'node:fs';
import PATH from 'node:path';
import { TerminalLog, ANSI } from '../common/util-prompts.ts';
import { DetectedRootDir, AbsLocalPath } from './file.mts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = TerminalLog('DIMPORT', 'TagCyan');
const DBG = true;
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const { BLU, YEL, RED, DIM, NRM } = ANSI;

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: import all server modules in the provided directory. Ignores files
 *  that are in subdirectories (useful for hiding). */
async function FindServerModules(absSrcDir: string): Promise<string[]> {
  const fn = 'FindServerModules:';
  if (!FS.existsSync(absSrcDir)) {
    LOG(`${RED}${fn} Source directory not found: ${absSrcDir}${NRM}`);
    return [];
  }
  try {
    const mtsFilter = file => file.endsWith('.mts');
    const mtsFiles = (await FS.promises.readdir(absSrcDir)).filter(mtsFilter);
    // load mts modules
    for (const file of mtsFiles) {
      const absFile = PATH.join(absSrcDir, file);
      await import(absFile);
    }
    // return the list of imported files
    return mtsFiles;
  } catch (error) {
    if (error.message.includes(`find package '_ur`))
      LOG(`${RED}${fn} SNA dynamic modules can not use path aliases${NRM}`);
    throw Error(`${fn} Error during dynamic import: ${error.message}`);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: return all the client modules in the provided directory. */
async function FindClientEntryFiles(srcDir: string): Promise<string[]> {
  const fn = 'FindClientEntryFiles:';
  if (!FS.existsSync(srcDir)) {
    LOG(`${RED}${fn} Source directory not found: ${srcDir}${NRM}`);
    return [];
  }
  try {
    const tsFilter = file =>
      file.endsWith('.ts') && !file.startsWith('_') && !file.startsWith('auto-');
    const clientFiles = (await FS.promises.readdir(srcDir)).filter(tsFilter);
    return clientFiles;
  } catch (error) {
    throw Error(`${fn} Error during dynamic import: ${error.message}`);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: write a temp file that imports client modules that can be used as
 *  the entry point for a web bundler. */
async function MakeAppImports(
  srcDir: string
): Promise<{ entryFile: string; tsFiles: string[] }> {
  const fn = 'MakeAppImports:';
  if (!FS.existsSync(srcDir)) {
    LOG(`${RED}${fn} Source directory not found: ${srcDir}${NRM}`);
    return undefined;
  }
  try {
    const clientFiles = await FindClientEntryFiles(srcDir);
    let out = `// sna single import autogenerated file\n`;
    if (clientFiles.length === 0) {
      const shortDir = PATH.basename(srcDir);
      out += `document.body.innerHTML = '<h2>The <i>${shortDir}</i> directory has no source files.</h2>`;
      out += `Add an app.ts file as an entry point. Hide non-entrypoint files in subdirs.';\n`;
    }
    for (const file of clientFiles) out += `import './${file}';\n`;
    const outFile = 'auto-app-imports.ts';
    const outPath = PATH.join(srcDir, outFile);
    await FS.promises.writeFile(outPath, out);
    return { entryFile: outFile, tsFiles: clientFiles };
  } catch (error) {
    if (error.message.includes(`find package '_ur`))
      LOG(`${RED}${fn} SNA dynamic modules can not use path aliases${NRM}`);
    throw Error(`${fn} Error during dynamic import: ${error.message}`);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** API: write a temp file that imports web components matching the file
 *  pattern part-part.ts to make a single import */
async function MakeWebCustomImports(
  srcDir: string
): Promise<{ webcFile: string; webcFiles: string[] }> {
  const fn = 'MakeWebCustomImports:';
  if (!FS.existsSync(srcDir)) {
    LOG(`${RED}${fn} Source directory not found: ${srcDir}${NRM}`);
    return undefined;
  }
  try {
    const tsFiles = await FindClientEntryFiles(srcDir);
    const webcFiles = tsFiles.filter(file => /^[a-z]+-[a-z]+\.ts$/.test(file));
    /// GENERATE IMPORT FILE
    let out = `// sna webcomponent autogenerated file\n`;
    if (webcFiles.length === 0) {
      const shortDir = PATH.basename(srcDir);
      out += `document.body.innerHTML = '<h2>The <i>${shortDir}</i> directory has no files `;
      out += `that match the two part filename pattern.</h2>`;
      out += `Add an app.ts file as an entry point. Hide non-entrypoint files in subdirs.';\n`;
    } else {
      // we have files so generate output
      const imports = [];
      const defines = [];
      for (const file of webcFiles) {
        const base = file.slice(0, -3);
        const def = base.replace('-', '_').toUpperCase();
        imports.push(`import ${def} from './${file}';\n`);
        defines.push(`  customElements.define('${base}', ${def});\n`);
      }
      out += '\n';
      imports.forEach(line => (out += line));
      out += '\n';
      out += `function DeclareComponents() {\n`;
      defines.forEach(line => (out += line));
      out += `}\n\n`;
      out += `export { DeclareComponents };\n`;
    }
    /// WRITE IMPORT FILE
    // get the last directory in the path
    const id = PATH.basename(srcDir);
    const outFile = `auto-${id}-imports.ts`;
    const outPath = PATH.join(srcDir, outFile);
    await FS.promises.writeFile(outPath, out);
    return { webcFile: outFile, webcFiles };
  } catch (error) {
    if (error.message.includes(`find package '_ur`))
      LOG(`${RED}${fn} SNA dynamic modules can not use path aliases${NRM}`);
    throw Error(`${fn} Error during dynamic import: ${error.message}`);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  FindServerModules, // import all server modules in the provided directory
  FindClientEntryFiles, // return all the client modules in the provided directory
  MakeAppImports, // write a temp file that imports client modules
  MakeWebCustomImports // write a temp file that imports web components
};
