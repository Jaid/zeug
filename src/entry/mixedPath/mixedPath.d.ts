/// <reference types="node" resolution-mode="require"/>
import type { FormatInputPathObject, ParsedPath } from 'node:path';
export declare const slash: (fileOrFolder: string) => string;
export declare const normalize: (fileOrFolder: string) => string;
export declare const join: (...pathSegments: string[]) => string;
export declare const resolve: (...pathSegments: string[]) => string;
export declare const isAbsolute: (fileOrFolder: string) => boolean;
export declare const relative: (from: string, to: string) => string;
export declare const dirname: (fileOrFolder: string) => string;
export declare const basename: (fileOrFolder: string, suffix?: string) => string;
export declare const extname: (fileOrFolder: string) => string;
export declare const parse: (fileOrFolder: string) => ParsedPath;
export declare const format: (fileOrFolderObject: FormatInputPathObject) => string;
export declare const toNamespacedPath: (fileOrFolder: string) => string;
declare const _default: {
    basename: (fileOrFolder: string, suffix?: string | undefined) => string;
    dirname: (fileOrFolder: string) => string;
    extname: (fileOrFolder: string) => string;
    format: (fileOrFolderObject: FormatInputPathObject) => string;
    isAbsolute: (fileOrFolder: string) => boolean;
    join: (...pathSegments: string[]) => string;
    normalize: (fileOrFolder: string) => string;
    parse: (fileOrFolder: string) => ParsedPath;
    relative: (from: string, to: string) => string;
    resolve: (...pathSegments: string[]) => string;
    toNamespacedPath: (fileOrFolder: string) => string;
};
export default _default;
