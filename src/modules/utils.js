import { isValidCellData } from "./validator.js";
import { rowData } from "../files/worksheet.js";
import { unzipSync, strFromU8 } from "fflate";

/**
 * @typedef { import("../files/worksheet").cellData } cellData
 * @typedef { import("../structures/ArrayData").default<cellData | number | string> } row
 */

/**
 * Generate and get valid cell data
 * @param {row} row
 * @return {rowData}
 */
const generateCellData = (row) => {
    if (!row.every((e) => isValidCellData(e))) {
        return row.map((val) => {
            if (typeof val === "number") return { value: val, type: "number" };
            return { value: val.toString(), type: "string" };
        });
    }

    return row;
};

/**
 * Get Xlsx file contens
 * @param {File | Blob | ArrayBuffer} input
 * @returns {Promise<Map<string, string>}
 */
const getXlsContents = async (input) => {
    input =
        input instanceof File || input instanceof Blob
            ? await input.arrayBuffer()
            : input;
    if (!input) return {};

    const archive = new Uint8Array(input),
        contents = unzipSync(archive),
        unzippedFile = new Map();

    for (let key of Object.keys(contents)) {
        unzippedFile.set(key, strFromU8(contents[key]));
    }

    return unzippedFile;
};

/**
 * Get Xml contens
 * @param {string} filePath
 * @param {Map<string, string>} contents
 * @returns {string} Path contents
 */
const getXmlContent = (filePath, contents) => {
    if (!contents.has(filePath)) {
        throw new Error(
            `"${filePath}" file not found inside the *.xlsx file zip archive`
        );
    }
    return contents.get(filePath);
};

export { generateCellData, getXlsContents, getXmlContent };
