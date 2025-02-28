import { TERM_COLORS, CSS_COLORS, ANSI_COLORS } from './declare-colors.ts';
/** Return a function that will prompt strings for you. The function will
 *  returns an array to destructure into console.log(). This is supported
 *  in Chrome and Safari (somewhat), but not in Firefox as of last testing.
 *
 *  To create the function, provide a short prompt. This will be color coded
 *  according to the PROMPTS_DICT table, or gray otherwise. You can turn off the
 *  debug output for all prompts in a category also for centralized debug
 *  statement control.
 *
 *  The prompt function accepts a string followed by any number of parameters.
 *  It returns an array of values that are destructured inside of console.log()
 *    const promptFunction = makeLoginHelper('APP');
 *    console.log(...promptFunction('huzzah'));
 *
 *  NOTE: This doesn't work as expected on NodeJS, because empty arrays
 *  render as linefeeds so we just output it regardless. If you want to
 *  disable output, use the makeTerminalOut() function instead.
 */
/** allow modification of the PROMPT_DICT
 */
declare function makeStyleFormatter(prompt: any, tagColor: any): (() => any[]) | {
    (str: any, ...args: any[]): any[];
    _: string;
};
/** Return function to directly print to console instead of returning an array.
 *  This works better for NodeJS since the empty [] still results in output
 *  unlike the browser. Use makeStyleFormatter for browsers
 */
declare function makeTerminalOut(prompt: any, tagColor?: string, pad?: number): any;
export { TERM_COLORS as TERM, CSS_COLORS as CSS, ANSI_COLORS as ANSI, makeStyleFormatter as ConsoleStyler, makeTerminalOut as TerminalLog };
declare const _default: {
    TERM: {
        [key: string]: string;
    };
    CSS: {
        [key: string]: string;
    };
    ANSI: {
        BLU: string;
        YEL: string;
        RED: string;
        DIM: string;
        BLD: string;
        NRM: string;
        BRI: string;
    };
    ConsoleStyler: typeof makeStyleFormatter;
    TerminalLog: typeof makeTerminalOut;
};
export default _default;
