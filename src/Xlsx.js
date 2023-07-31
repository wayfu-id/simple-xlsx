import { getTagName, findChild, forEach, map } from "./modules/dom.js";
import ArrayData from "./structures/ArrayData.js";

export default class Xlsx {
    constructor() {}

    /**
     * Get inline cells info
     * @param {Document} doc What Document?
     * @returns {ArrayData<Element>}
     */
    static getCells(doc) {
        let sheetData = findChild(doc.documentElement, "sheetData"),
            cells = new ArrayData();

        forEach(sheetData, "row", (row) => {
            forEach(row, "c", (cell) => {
                cells.push(cell);
            });
        });

        return cells;
    }

    /**
     * Get merged cells info
     * @param {Document} doc What Document?
     * @returns {ArrayData<Element>}
     */
    static getMergedCells(doc) {
        let mergedCells = findChild(doc.documentElement, "mergeCells"),
            mergedCellsInfo = new ArrayData();

        if (mergedCells) {
            forEach(mergedCells, "mergeCell", function (mergedCell) {
                mergedCellsInfo.push(mergedCell.getAttribute("ref"));
            });
        }

        return mergedCellsInfo;
    }

    /**
     * Get cell value
     * @param {Element} node On Which element?
     * @returns {Element}
     */
    static getCellValue(node) {
        return findChild(node, "v");
    }

    /**
     * Get Cell Inline String Value
     * @param {Element} node On Which element?
     * @returns {String}
     */
    static getCellInlineStringValue(node) {
        if (
            node.firstChild &&
            getTagName(node.firstChild) === "is" &&
            node.firstChild.firstChild &&
            getTagName(node.firstChild.firstChild) === "t"
        ) {
            return node.firstChild.firstChild.textContent;
        }
    }

    /**
     * Get Dimensions info
     * @param {Document} doc What Document?
     * @returns {String}
     */
    static getDimensions(doc) {
        let dimensions = findChild(doc.documentElement, "dimension");
        if (!dimensions) return false;

        return dimensions.getAttribute("ref");
    }

    /**
     * Get Shared strings
     * @param {Document} doc What Document?
     * @returns {ArrayData<String>}
     */
    static getSharedStrings(doc) {
        return map(doc.documentElement, "si", function (string) {
            const t = findChild(string, "t");
            if (t) return t.textContent;

            let value = "";
            forEach(string, "r", function (r) {
                value += findChild(r, "t").textContent;
            });
            return value;
        });
    }

    /**
     * Get Based Styles elements
     * @param {Document} doc What Document?
     * @returns {ArrayData<Element>}
     */
    static getBaseStyles(doc) {
        let cellStyleXfs = findChild(doc.documentElement, "cellStyleXfs");
        if (!cellStyleXfs) return new ArrayData();

        return findChild(cellStyleXfs, "xf", true);
    }

    /**
     * Get Number formats elements
     * @param {Document} doc What Document?
     * @returns {ArrayData<Element>}
     */
    static getNumberFormats(doc) {
        let numFmts = findChild(doc.documentElement, "numFmts");
        if (!numFmts) return new ArrayData();

        return findChild(numFmts, "numFmt", true);
    }

    /**
     * Get Workbook properties
     * @param {Document} doc What Document?
     * @returns {Element}
     */
    static getWorkbookProperties(doc) {
        return findChild(doc.documentElement, "workbookPr");
    }

    /**
     * Get Cell Styles elements
     * @param {Document} doc What Document?
     * @returns {ArrayData<Element>}
     */
    static getCellStyles(doc) {
        let cellXfs = findChild(doc.documentElement, "cellXfs");
        if (!cellXfs) return new ArrayData();

        return findChild(cellXfs, "xf", true);
    }

    /**
     * Get all Relationships elements
     * @param {Document} doc What Document?
     * @returns {ArrayData<Element>}
     */
    static getRelationships(doc) {
        return findChild(doc.documentElement, "Relationship", true);
    }

    /**
     * Get all Sheets elements
     * @param {Document} doc What Document?
     * @returns {ArrayData<Element>}
     */
    static getSheets(doc) {
        let sheets = findChild(doc.documentElement, "sheets");
        if (!sheets) return new ArrayData();

        return findChild(sheets, "sheet", true);
    }
}
