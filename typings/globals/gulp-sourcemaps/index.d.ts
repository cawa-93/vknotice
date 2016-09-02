// Generated by typings
// Source: https://raw.githubusercontent.com/DefinitelyTyped/DefinitelyTyped/56295f5058cac7ae458540423c50ac2dcf9fc711/gulp-sourcemaps/gulp-sourcemaps.d.ts
declare module "gulp-sourcemaps" {
    interface InitOptions {
        loadMaps?: boolean;
        debug?: boolean;
    }

    interface WriteMapper {
        (file: string): string;
    }

    interface WriteOptions {
        addComment?: boolean;
        includeContent?: boolean;
        sourceRoot?: string | WriteMapper;
        sourceMappingURLPrefix?: string | WriteMapper;
    }

    export function init(opts?: InitOptions): NodeJS.ReadWriteStream;
    export function write(path?: string, opts?: WriteOptions): NodeJS.ReadWriteStream;
    export function write(opts?: WriteOptions): NodeJS.ReadWriteStream;
}