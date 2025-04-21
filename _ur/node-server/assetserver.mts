/*///////////////////////////////// ABOUT \\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\*\

  AssetServer (initial port from GEMSTEP)

  // TODO: Express Middleware not tested
  // TODO: Manifest format doesn't yet match dataset.d.ts definitions

\*\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\\ * /////////////////////////////////////*/

import * as FSE from 'fs-extra';
import PATH from 'path';
import express from 'express';
import serveIndex from 'serve-index';
import {
  Files,
  ReadJSON,
  FilesHashInfo,
  GetPathInfo,
  DirExists,
  GetDirContent
} from './file.mts';
import { GetReqInfo } from './util-express.mts';
import { IsAssetDirname } from '../common/util-data-ops.ts';

/// TYPE DECLARATIONS /////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -

/// CONSTANTS & DECLARATIONS //////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
const PACKAGE_NAME = 'URSYS-ASSETSERVER';
const MANIFEST_FILENAME = '00-manifest';
//
let APP: express.Application; // the express app
//
let m_asset_path: string; // path to the root asset directory
let m_asset_uri: string; // uri serving m_asset_path
let m_project_route: string; // the path-to-project (dataset)
let m_asset_counter = 1000; // asset id counter
//

/// MANIFEST UTILITIES ////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** scans the passed dirpath for any manifest JSON files. Returns an array of
 *  manifest objects */
function m_GetPredefinedManifests(dataPath: string) {
  const allfiles = Files(dataPath);
  const mfiles = allfiles
    .filter(f => f.startsWith(MANIFEST_FILENAME) && f.endsWith('.json'))
    .sort();
  // case 1: 1 more more manifest files exist
  if (mfiles.length > 0) {
    const manifestObjs = [];
    for (let f of mfiles) {
      const obj = ReadJSON(`${dataPath}/${f}`);
      manifestObjs.push(obj);
    }
    return manifestObjs;
  }
  // casee 2: no manifest files found
  return [];
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Return a list of mediafiles for the assetype of the directory, which is
 *  determined by the terminating dirname of the path. */
async function m_GetAssetFileInfo(assetPath: string) {
  const files = Files(assetPath);
  const assetInfo = await FilesHashInfo(files);
  return assetInfo;
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given list of directories, create the manifest object
 *  // TODO: update to new manifest format */
async function m_MakeManifestObj(assetDirs: string[]) {
  const manifest = {};
  for (const subdir of assetDirs) {
    const assetInfo = await m_GetAssetFileInfo(subdir);
    const entries = [];
    for (let info of assetInfo) {
      const assetId = m_asset_counter++;
      const { filename, ext, hash } = info;
      const asset = {
        assetId,
        assetName: filename,
        assetUrl: `${subdir}/${filename}`,
        assetType: ext,
        hash
      };
      entries.push(asset);
    }
    manifest[subdir] = entries;
  } // end subdir processing
  return manifest;
}

/// MIDDLEWARE ////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** Handle ?manifest url requests. If the directory exists, return or generate
 *  the manifest file. If the directory doesn't exist, check the remote master
 *  asset repo for the manifest file. If it exists, return it, otherwise
 *  download the remote manifest directory and generate it. */
async function DeliverManifest(req, res, next) {
  const manifest = {};
  const { fullURL, pathname, searchParams } = GetReqInfo(req);
  const path = PATH.join(m_asset_path, pathname);
  // bail if not a manifest request
  if (!searchParams.has('manifest')) {
    next();
    return;
  }
  // bail if the requested path isn't a directory
  const pathInfo = GetPathInfo(path);
  if (pathInfo.isFile) {
    const err = `${fullURL} appears to be a file request, not a directory`;
    res.status(400).send(err);
    return;
  }

  // if the directory exists, check for manifest files
  if (DirExists(path)) {
    const mdata = m_GetPredefinedManifests(path);
    /** case 1: manifest file found in dir */
    if (mdata.length > 0) {
      res.json(mdata);
      return;
    }
    /** case 2: autogenerate manifest file */
    const { dirs } = GetDirContent(path);
    const assetDirs = dirs.filter(d => IsAssetDirname(d));
    if (assetDirs.length > 0) {
      m_MakeManifestObj(assetDirs).then(result => {
        res.json(result);
      });
      return;
    }
    // no asset dirs found
    return;
  }
}
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** return Express middleware function that serves manifest if ?manifest query
 *  is present in the URL */
function AssetManifest_Middleware(opts: { assetPath: string; assetURI: string }) {
  const { assetPath, assetURI } = opts;
  return (req, res, next) => {
    m_asset_path = assetPath;
    m_asset_uri = assetURI;
    DeliverManifest(req, res, next);
  };
}

/// API METHODS ///////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** create the asset server directory and write id text file */
function SetupServer() {
  const fn = 'SetupServer:';
  const assetPath = 'abspath-to/asset-dir';
  const assetURI = 'https://server/asset-dir';

  FSE.ensureDirSync(PATH.join(assetPath));
  const INDEX_TEXT = `${PACKAGE_NAME} - GEMSTEP MAIN CONTROL PROGRAM HOST `;
  const INDEX_SEND = PATH.join(assetPath, '_serverId.txt');
  FSE.writeFileSync(INDEX_SEND, INDEX_TEXT);

  if (APP) throw Error(`${fn} server already set up`);
  APP = express();

  // set up asset manifest, index, media mediaproxy
  APP.use(
    '/assets',
    AssetManifest_Middleware({ assetPath, assetURI }), // should be gs_assets_hosted
    express.static(assetPath),
    // UR.MediaProxy_Middleware({}) // asset host servers do not proxy
    serveIndex(assetPath, { 'icons': true })
  );
}

/// EXPORTS ///////////////////////////////////////////////////////////////////
/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
export {
  // express methods
  SetupServer,
  AssetManifest_Middleware,
  DeliverManifest
};
