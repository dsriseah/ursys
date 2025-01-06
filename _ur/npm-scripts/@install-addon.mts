/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  URSYS Bare Module Template
  - for detailed example, use snippet 'ur-module-example' instead

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import { execSync } from 'child_process';
import * as https from 'https';
import * as fs from 'node:fs';
import * as PATH from 'node:path';
import * as zlib from 'zlib';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type URIHandler = (uri: string, targetDir: string) => Promise<void>;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const TEMP_DIR = PATH.join(__dirname, 'temp');
const TARGET_DIR = PATH.join(__dirname, 'target-directory');

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Helper Functions
function isGitHubRepo(uri: string): boolean {
  return uri.endsWith('.git');
}

function isArchiveFile(uri: string): boolean {
  return uri.endsWith('.tar.gz') || uri.endsWith('.zip');
}

/// SUPPORT METHODS ///////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function runCommand(command: string, options: { cwd?: string } = {}): void {
  try {
    console.log(`Running: ${command}`);
    execSync(command, { stdio: 'inherit', ...options });
  } catch (error) {
    console.error(`Command failed: ${command}`);
    throw error;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function downloadFile(url: string, dest: string): Promise<void> {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(dest);
    https
      .get(url, response => {
        if (response.statusCode !== 200) {
          reject(new Error(`Failed to download file: ${response.statusCode}`));
          return;
        }
        response.pipe(file);
        file.on('finish', () => file.close(() => resolve()));
      })
      .on('error', err => {
        fs.unlinkSync(dest);
        reject(err);
      });
  });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function extractTarGz(filePath: string, extractDir: string): Promise<void> {
  const tar = await import('tar'); // Dynamically import for TypeScript support
  await tar.extract({ file: filePath, cwd: extractDir });
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
async function extractZip(filePath: string, extractDir: string): Promise<void> {
  const unzipProcess = execSync(`unzip ${filePath} -d ${extractDir}`);
  if (unzipProcess) {
    console.log(`Unzipped file to ${extractDir}`);
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
function copyDirectory(source: string, destination: string): void {
  if (!fs.existsSync(source)) {
    throw new Error(`Source directory does not exist: ${source}`);
  }

  fs.mkdirSync(destination, { recursive: true });

  const items = fs.readdirSync(source, { withFileTypes: true });
  items.forEach(item => {
    const srcPath = PATH.join(source, item.name);
    const destPath = PATH.join(destination, item.name);

    if (item.isDirectory()) {
      copyDirectory(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
    }
  });
}

/// MAIN API //////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const handleURI: URIHandler = async (uri, targetDir) => {
  try {
    if (isGitHubRepo(uri)) {
      console.log(`Detected GitHub repository: ${uri}`);
      runCommand(`git clone ${uri} ${TEMP_DIR}`);
      copyDirectory(TEMP_DIR, targetDir);
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
    } else if (isArchiveFile(uri)) {
      console.log(`Detected archive file: ${uri}`);
      const archivePath = PATH.join(TEMP_DIR, 'downloaded-archive');
      await downloadFile(uri, archivePath);
      fs.mkdirSync(TEMP_DIR, { recursive: true });

      if (uri.endsWith('.tar.gz')) {
        await extractTarGz(archivePath, TEMP_DIR);
      } else if (uri.endsWith('.zip')) {
        await extractZip(archivePath, TEMP_DIR);
      }

      copyDirectory(TEMP_DIR, targetDir);
      fs.rmSync(TEMP_DIR, { recursive: true, force: true });
      fs.unlinkSync(archivePath);
    } else {
      throw new Error(
        'Unsupported URI format. Must be a GitHub repository or an archive file.'
      );
    }
    console.log('Done!');
  } catch (error) {
    console.error('Error:', error.message);
  }
};

/// RUNTIME ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
// Example Execution
(async () => {
  const URI = 'https://github.com/owner/repo.git'; // Replace with the desired URI
  await handleURI(URI, TARGET_DIR);
})();

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
