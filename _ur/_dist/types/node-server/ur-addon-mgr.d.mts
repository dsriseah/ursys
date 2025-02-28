#!/usr/bin/env node
/** API: fork a module and setup its IPC
 *  @param {string} modname "moduleDir/@entryFile"
 *  @param input input file or stream
 *  @param output output file or stream
 *  @returns {object} input, output, options props if found
 */
declare function UR_Fork(modname: any, opt?: {}): Promise<any>;
declare function ProcTest(): void;
export { UR_Fork, ProcTest };
