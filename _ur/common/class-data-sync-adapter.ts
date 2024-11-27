/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  A DataSyncAdapter maps our DATASET operations to a remote data store. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  DataSyncOp,
  DataBinID,
  UR_Item,
  UR_EntID,
  DataObj,
  OpResult,
  DataSyncReq,
  DataSyncRes
} from '../@ur-types.d.ts';
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
type AccessToken = string;
type BucketID = string;
type AuthToken = string;

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// HELPER METHODS ////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CLASS DECLARATION /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
abstract class DataSyncAdapter {
  /** request an access token for specifific bucket, token */
  abstract requestAccessToken(bucket: BucketID, auth: AuthToken): Promise<OpResult>;
  //
  /** set adapter-specific options */
  abstract setOptions(opt: DataObj): void;
  abstract getOptions(): DataObj;

  /** connect, disconnect to databucket using access token */
  abstract openDataBucket(acc: AccessToken): Promise<OpResult>;
  abstract closeDataBucket(acc: AccessToken): Promise<OpResult>;

  /** reset the data bucket to empty if access token allows */
  abstract clearDataBucket(acc: AccessToken): Promise<OpResult>;

  /** regular CRUD operations */
  abstract getData(cName: DataBinID, ids?: UR_EntID[]): Promise<DataSyncRes>;
  abstract addData(cName: DataBinID, items: UR_Item[]): Promise<DataSyncRes>;
  abstract updateData(cName: DataBinID, items: UR_Item[]): Promise<DataSyncRes>;
  abstract syncData(cName: DataBinID, items: UR_Item[]): Promise<DataSyncRes>;
  abstract deleteData(cName: DataBinID, ids: UR_EntID[]): Promise<DataSyncRes>;
  abstract replaceData(cName: DataBinID, items: UR_Item[]): Promise<DataSyncRes>;
  abstract clearData(cName: DataBinID): Promise<DataSyncRes>;

  /** bin or whole dataset load/save */
  abstract saveData(cName?: DataBinID): Promise<DataSyncRes>;
  abstract loadData(cName?: DataBinID): Promise<DataSyncRes>;

  /** route errors from remote adapter code through handleError */
  abstract handleError(result: DataSyncRes): DataSyncRes;

  /// DEFAULT SERIALIZERS ///

  async getJSON(): Promise<string> {
    const data = await this.loadData();
    if (data.error) {
      console.log(`Error loading data: ${data.error}`);
      return undefined;
    }
    return JSON.stringify(data);
  }

  async setFromJSON(json: string): Promise<OpResult> {
    const data = JSON.parse(json);
    return this.saveData(data);
  }
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export default DataSyncAdapter;
export { DataSyncAdapter };
