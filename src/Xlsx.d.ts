import ArrayData from "./structures/ArrayData";

export default class Xlsx {    
    /**
     * Get inline cells info
     */
    static getCells(doc: Document): ArrayData<Element>;

    /**
     * Get merged cells info
     */
    static getMergedCells(doc: Node): ArrayData<Element>;

    /**
     * Get cell value
     */
    static getCellValue(node: Node): Element;

    /**
     * Get Cell Inline String Value
     */
    static getCellInlineStringValue(node: Node): string;

    /**
     * Get Dimensions info
     */
    static getDimensions(doc: Document): string;

    /**
     * Get Shared strings
     */
    static getSharedStrings(doc: Document): ArrayData<string>;

    /**
     * Get Based Styles elements
     */
    static getBaseStyles(doc: Document): ArrayData<Element>;

    /**
     * Get Number formats elements
     */
    static getNumberFormats(doc: Document): ArrayData<Element>;

    /**
     * Get Workbook properties
     */
    static getWorkbookProperties(doc: Document): Element;

    /**
     * Get Cell Styles elements
     */
    static getCellStyles(doc: Document): ArrayData<Element>;

    /**
     * Get all Relationships elements
     */
    static getRelationships(doc: Document): ArrayData<Element>;

    /**
     * Get all Sheets elements
     */
    static getSheets(doc: Document): ArrayData<Element>;
}