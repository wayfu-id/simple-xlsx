import ArrayData from "../structures/ArrayData";
import { cellData, rowData } from "../files/worksheet";

/** Generate and get valid cell data */
export function generateCellData(row: ArrayData<cellData | number | string>): rowData;

/** Get Xlsx file contens */
export async function getXlsContents(input: File | Blob | ArrayBuffer): Promise<Map<string, string>>;

/** Get Xml contens */
export function getXmlContent(filePath: string, contents: Map<string, string>): string;