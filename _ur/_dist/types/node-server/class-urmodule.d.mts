/** standardized interface for modules that are capable of
 *  chaining stream-style operations as well as providing an API interface
 */
declare class UrModule {
    id: any;
    modObj: any;
    modName: string;
    modType: string;
    modIn: any;
    modOut: any;
    protocol: any;
    inputBuffer: any[];
    outputBuffer: any[];
    error: string;
    static modtype_enum: string[];
    static buffer_size: number;
    static id_counter: number;
    /** constructor
     *  this class wraps the provided object with a standardized interface,
     *  supporting the types defined in this.modtype_enum. It performs a runtime
     *  check to determine the modType of the provided object.
     *  @param {object} obj an eventEmitter, process, or stream
     *  @param {object} modIn instance of UrModule
     *  @param {object} modOut instance of UrModule
     */
    constructor(mobj: any, opt: any);
    /** set the name of the module */
    setName(name: any): void;
    /** set up the handler for a child process that is compatible with
     *  the UrModule interface.
     */
    manageFork(): void;
    /** initializes datalink for connected modules. it's called
     *  by the constructor implictly.
     */
    linkModules(modIn: any, modOut: any): void;
    /** the input modules are a data source, so we expect to
     *  receive data messages as well as handshake information.
     *  Uses URDEX protocol: expects 'DATA' message
     */
    activateInput(): void;
    /** the output modules will communicate their status back
     *  to this module, providing events to signal what's going
     *  on.
     *  Uses URDEX protocol
     */
    activateOutput(): void;
    /** URDEX PROTOCOL *********************************************************/
    /** used to buffer input data as it is received, but not processed. Each
     *  chunk of data is of whatever modType is to be expected from the upstream
     *  module.
     *  @param {object} data the data to be buffered
     */
    bufferInput(data?: {}): void;
    /** retrieve buffered data one chunk at a time */
    getInputData(): any;
}
export default UrModule;
