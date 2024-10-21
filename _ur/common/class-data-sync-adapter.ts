/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  A DataSyncAdapter maps our DATASET operations to a remote data store. 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type {
  SyncDataOp,
  DataBinID,
  UR_Item,
  UR_EntID,
  DataObj,
  OpResult,
  SyncDataReq,
  SyncDataRes
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
  abstract getData(cName: DataBinID, ids?: UR_EntID[]): Promise<SyncDataRes>;
  abstract addData(cName: DataBinID, items: UR_Item[]): Promise<SyncDataRes>;
  abstract updateData(cName: DataBinID, items: UR_Item[]): Promise<SyncDataRes>;
  abstract syncData(cName: DataBinID, items: UR_Item[]): Promise<SyncDataRes>;
  abstract deleteData(cName: DataBinID, ids: UR_EntID[]): Promise<SyncDataRes>;
  abstract replaceData(cName: DataBinID, items: UR_Item[]): Promise<SyncDataRes>;
  abstract clearData(cName: DataBinID): Promise<SyncDataRes>;

  /** bin or whole dataset load/save */
  abstract saveData(cName?: DataBinID): Promise<SyncDataRes>;
  abstract loadData(cName?: DataBinID): Promise<SyncDataRes>;

  /** route errors from remote adapter code through handleError */
  abstract handleError(result: SyncDataRes): SyncDataRes;

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
