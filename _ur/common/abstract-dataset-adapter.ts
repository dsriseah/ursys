/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Base class for DatasetAdapters, which provide the bridge interface between
  a dataclient implementing dataset protocol and the remote server.

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

import type {
  IDS_DatasetAdapter,
  DatasetReq,
  DatasetRes,
  DataSyncOptions,
  DataSyncReq,
  DataSyncRes,
  DS_DataURI,
  DS_DatasetObj
} from '../@ur-types.d.ts';

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
abstract class DatasetAdapter implements IDS_DatasetAdapter {
  /** access token **/
  accToken: string;

  /** select the "current dataset to use" on master server */
  abstract selectDataset(dataURI: DS_DataURI): Promise<DatasetRes>;

  /** return either the current dataset object or the one
   *  specified by dataURI */
  abstract getDataObj(dataURI?: DS_DataURI): Promise<DS_DatasetObj>;

  /** perform a data collection (databin) operation, returning
   *  the status of the operation (but never data) */
  abstract syncData(synReq: DataSyncReq): Promise<DataSyncRes>;

  /** catch-all implementation-specific error handler */
  abstract handleError(errData: any): Promise<any>;
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default DatasetAdapter;
export { DatasetAdapter };
