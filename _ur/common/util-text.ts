/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Text and String Processing Utilities

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// PARSER INPUT NORMALIZER ////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Format a multi-line string to make parsing operations easier. It
 *  conforms newlines, replaces tabs. It removes whitespace around
 *  delimiters and collapses quoted whitespace to a single space.
 *  Finally, it ensures that there is a trailing newline.
 */
function PreprocessDataText(str: string): string {
  let normalizedStr = str.replace(/\r\n|\r/g, '\n'); // conform newlines
  normalizedStr = normalizedStr // remove trailing/preserve leading whitespace
    .split('\n')
    .map(line => line.replace(/\s+$/, '')) // remove trailing
    .map(line => line.replace(/^\s+/, '')) // remove leading
    .join('\n');
  normalizedStr = normalizedStr.replace(/\t/g, '  '); // replace tabs with 2 spaces
  let lines = normalizedStr.split('\n'); // split string into lines
  /** process whitespace around delimiters */
  const processDelimited = (line, delimiter) => {
    let parts = line.split(delimiter); // split lines based on delimiter
    for (let i = 0; i < parts.length; i++) {
      parts[i] = parts[i].trim();
      parts[i] = parts[i].replace(/\s+/g, ' ');
    }
    return parts.join(delimiter);
  };
  for (let i = 0; i < lines.length; i++) {
    lines[i] = processDelimited(lines[i], ',');
    lines[i] = processDelimited(lines[i], ':');
  }
  normalizedStr = lines.join('\n').trim();
  return normalizedStr + '\n';
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  PreprocessDataText // process a multi-line string for parsing
};
