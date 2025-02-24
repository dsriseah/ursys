import * as PATH from 'node:path';
import { basename, extname } from 'path';
import * as UFILE from './file.mts';

/// - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -
/** given a path segment and express req object, construct a custom URL object
 * that includes the base URL, full URL, pathname, basename, extname, host,
 * and searchParams. */
function GetReqInfo(req, baseRoute?: string) {
  if (typeof baseRoute !== 'string') {
    req = baseRoute;
    baseRoute = '';
  }
  if (baseRoute.endsWith('/')) baseRoute = baseRoute.slice(0, -1);
  if (typeof req !== 'object') {
    console.log('error: arg1 should be route, arg2 should be request objets');
    return undefined;
  }
  const hostRoute = baseRoute === '' ? '' : `/${baseRoute}`;
  const baseURL = `${req.protocol}://${req.headers.host}${hostRoute}`;
  const fullURL = `${req.protocol}://${req.headers.host}${req.originalUrl}`;
  const host = req.headers.host;
  // note: req.originalURL = this is the url INCLUDING the route
  // req.url, by comparison, omits the route
  const { pathname, searchParams } = new URL(req.url, baseURL);
  const basename = PATH.basename(pathname);
  const extname = PATH.extname(pathname);
  return {
    // given req to http://domain.com/path/to/name?foo=12&bar
    baseURL, // http://domain.com/route
    fullURL, // http://domains.com/route/path/base
    pathname, // we want /path/base
    basename, // we want base
    extname, // we want ext of base if it exists
    host, // we want domain.com
    searchParams // [SearchParameterObject]
  };
}

export {
  //
  GetReqInfo
};
