import generateWorksheet from "./worksheet";

export const contentTypes: XMLDocument;
export const relationships: XMLDocument;
export const workSheet = generateWorksheet;
export function workBook(sheetName?: string, sheetId?: string): {data: XMLDocument,rels: XMLDocument};