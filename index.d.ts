import ArrayData from "./src/structures/ArrayData";

import type {
    cellData,
    fullData,
    baseOptions,
    parsedSheetData,
    parsedFilePath,
    parsedProperties,
    parsedStyles
} from "./src/modules/parser";

import type { sheetData } from "./src/files/worksheet";

export default class XLSX {
    readonly options: baseOptions;
    readonly contents: Map<string, string>;
    readonly properties: parsedProperties;
    readonly paths: parsedFilePath;
    readonly values: ArrayData<string>;
    readonly styles: parsedStyles;
    readonly sheetId: string | undefined;
    readonly xmlContent: string;
    readonly parsedSheet: parsedSheetData<cellData>;

    /** Create new XLSX class */
    private constructor(contents: Map<string, string>, options: baseOptions);

    /** Read Xlsx contens data */
    read(): ArrayData<ArrayData<string | typeof Date | number>>;

    /** Open and read Xlsx file data */
    static read(file: File | Blob | ArrayBuffer, options: baseOptions): Promise<fullData>;

    /** Create and download file Xlsx */
    static write(data:sheetData, filename: string): void;
    /** Create and download file Xlsx with custom sheetname */
    static write(data:sheetData, filename: string, sheetname: string): void;
}

