/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Vitest Base Configuration

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const LOG = console.log.bind(console);
function MakeConfig(include: string[]) {
  return {
    test: {
      include,
      watch: true,
      setupFiles: '../_ur/npm-scripts/@build-core-vitest.mts',
      onConsoleLog(log: string, type: 'stdout' | 'stderr'): false | void {
        // only useful for not emitting ANY output buffered by a specific
        // test() runner, as the test buffers everything and only emits
        // at the begining and end of the test
      }
    }
  };
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export { MakeConfig };
