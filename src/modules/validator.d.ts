import { sheetData, cellData } from "../files/worksheet";

type xlsxConfig = { filename: string, data: sheetData, sheetname?: string };

/** Validate sheetData */
export function sheetValidator (rowData: sheetData): boolean;

export function isValidCellData (data: cellData | string | number): true;

/** Create error instance if sheet not found */
export function createSheetNotFoundError(sheet: string | number, sheets: ArrayData<sheetProperties>): Error;

/** Validate XLSX Export Config */
export default function validate(config: xlsxConfig): boolean;

export { xlsxConfig }