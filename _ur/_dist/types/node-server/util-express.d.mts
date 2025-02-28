/** given a path segment and express req object, construct a custom URL object
 * that includes the base URL, full URL, pathname, basename, extname, host,
 * and searchParams. */
declare function GetReqInfo(req: any, baseRoute?: string): {
    baseURL: string;
    fullURL: string;
    pathname: string;
    basename: string;
    extname: string;
    host: any;
    searchParams: URLSearchParams;
};
export { GetReqInfo };
