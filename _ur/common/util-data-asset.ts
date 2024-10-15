/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  Asset and Dataset Utility Module 

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
import type { OpResult } from '../_types/dataset';

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const DATASET_DIRNAMES = [
  // see dataset.d.ts UR_Dataset
  'docfolder',
  'itemlist',
  'stringlist',
  'filelist',
  'appconfig',
  'runconfig',
  'runstate',
  'runlogs',
  'templates'
];

function IsAssetDirname(dirname: string): boolean {
  return DATASET_DIRNAMES.includes(dirname);
}

export default {
  IsAssetDirname
};
export {
  //
  IsAssetDirname
};
