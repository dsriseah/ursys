/*//////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  File System Asset Helpers

  File operations specific to handling asset media

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * //////////////////////////////////////*/

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
