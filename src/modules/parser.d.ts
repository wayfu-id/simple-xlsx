import ArrayData from "../structures/ArrayData";

export type cellData = string | typeof Date | number;
export type rowData = ArrayData<cellData>;
export type fullData = ArrayData<rowData>;

export type baseOptions = {
    sheet?: string | number;
    trim?: boolean;
    epoch1904?: boolean;
    transformData?: (data: fullData) => fullData;
}

export type sheetProperties = {
    id: string,
    name: string,
    relationId: string
}

export type cellValueOptions = {
    inlineStringValue: () => string,
    inlineStringXml: () => string,
    styleId: () => string,
    styles: ArrayData<{numberFormat:any;}>,
    values: ArrayData<string>,
    properties: parsedProperties,
    options: {trim?:boolean}
}

export type parsedProperties = {
    epoch1904: boolean;
    sheets: ArrayData<sheetProperties>
}

export type parsedFilePath = {
    sheets: {};
    sharedStrings: string;
    styles: string;
}

export type parsedStyles = ArrayData<{numberFormat:any}>

export type docDimension = { row: number, column: number }

export type parsedCellValue<T extends Object> = docDimension & { value: T }

export type parsedSheetData<T extends Object> = { cells: ArrayData<parsedCellValue<T>>, dimensions: docDimension[] }

/** Checking current value is datetimestamp or not */
declare function isDateTimestamp(styleId: string, styles: ArrayData<{}>, options: {}): boolean;

/** Parse document dimensions */
declare function parseDimensions(sheet: Document):docDimension[];

/** Parse cells and get its value and ordinat */
declare function parseCells(sheet: Document, values: ArrayData<string>, styles: parsedStyles, properties: parsedProperties, options: {}): parsedCellValue<string | typeof Date | number>[];

/** Parse givent coordinats to array of number */
declare function parseCellCoordinates(coords: string): [number, number];

/** Parse only cells value */
declare function parseCellValue(value: string, type: string, opt: cellValueOptions): string | typeof Date | number;

/** Calculate document dimensions if parsing gets null */
declare function calculateDimensions(cells: ArrayData<parsedCellValue<columnData>>): docDimension[];

/** Decode error message based on it's code */
declare function decodeError(errorCode: string): string;

/** Parse value to string */
declare function parseString(value: string | number, options?: {trim?: boolean}): string | undefined; 

/** Parse value to Date */
declare function parseDate(excelSerialDate: number, options?: {epoch1904?: boolean}): typeof Date;

/** Convert excel column letter to number */
declare function columnLettersToNumber(columnLetters: string): number;

/** Parse string to Document Element */
declare function createDocument(content: string): Document;

/** Parse document properties */
export function parseProperties(content: string): parsedProperties;

/** Parse document file paths */
export function parseFilePaths(content: string): parsedFilePath;

/** Parse document styles */
export function parseStyles(content: string): parsedStyles;

/** Get all shared strings */
export function parseSharedStrings(content: string): ArrayData<string>;

/** Get parsed sheet data */
export function parseSheet(content: string, values: ArrayData<string>, styles: parsedStyles, properties: parsedProperties, options?: baseOptions): parsedSheetData<string | typeof Date | number>;