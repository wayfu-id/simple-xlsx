import ArrayData from "../structures/ArrayData";

type cellData = { type: "string" | "number", value: string | number };
type rowData = ArrayData<cellData>;
type altRowData = ArrayData<string | number>;
type sheetData = ArrayData<rowData | altRowData>;

/** Generate Worksheet */
export default function generateWorksheet(data: sheetData): XMLDocument;

export { cellData, rowData, altRowData, sheetData };