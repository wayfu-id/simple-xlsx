import {
    parseFilePaths,
    parseProperties,
    parseSharedStrings,
    parseSheet,
    parseStyles,
} from "./src/modules/parser.js";
import { getXlsContents, getXmlContent } from "./src/modules/utils.js";
import { createSheetNotFoundError } from "./src/modules/validator.js";
import { createXlsx } from "./src/modules/write.js";
import ArrayData from "./src/structures/ArrayData.js";

/**
 * Importing Types
 * @typedef { import("./src/modules/parser").cellData } cellData
 * @typedef { import("./src/modules/parser").fullData } fullData
 * @typedef { import("./src/modules/parser").baseOptions } baseOptions
 * @typedef { import("./src/modules/parser").parsedFilePath } parsedFilePath
 * @typedef { import("./src/modules/parser").parsedStyles } parsedStyles
 * @typedef { import("./src/modules/parser").parsedProperties } parsedProperties
 * @typedef { import("./src/modules/parser").parsedSheetData<cellData> } parsedSheetData
 * @typedef { import("./src/modules/parser").sheetProperties } sheetProperties
 *
 * @typedef { import("./src/files/worksheet").sheetData } sheetData
 */

const XLSX = (function () {
    const _token = Symbol();

    return class XLSX {
        /**
         * Create new XLSX class
         * @param {Map<string, string>} contents
         * @param {baseOptions} options
         * @param {symbol} token
         * @returns
         */
        constructor(contents, options, token) {
            if (_token !== token) {
                throw new TypeError(
                    "XLSX is not constructable. Use XLSX.read(). or XLSX.write()"
                );
            }

            /** @type {Map<string, string>} */
            this.contents = contents;

            /** @type {baseOptions} */
            this.options = options;
        }

        /**
         * @readonly
         * @type {parsedProperties}
         */
        get properties() {
            let { contents } = this;
            return parseProperties(getXmlContent("xl/workbook.xml"), contents);
        }

        /**
         * @readonly
         * @type {parsedFilePath} */
        get paths() {
            let { contents } = this;
            return parseFilePaths(getXmlContent("xl/_rels/workbook.xml.rels"), contents);
        }

        /**
         * @readonly
         * @type {ArrayData<string>}
         */
        get values() {
            let { sharedStrings } = this.paths,
                { contents } = this;

            return sharedStrings
                ? parseSharedStrings(getXmlContent(sharedStrings, contents))
                : [];
        }

        /**
         * @readonly
         * @type {{}}
         */
        get styles() {
            let { styles } = this.paths,
                { contents } = this;

            return styles ? parseStyles(getXmlContent(styles), contents) : {};
        }

        /**
         * @readonly
         * @type {string | undefined}
         */
        get sheetId() {
            let { sheet } = this.options,
                { sheets } = this.properties;

            if (typeof sheet === "number") {
                let { relationId } = sheets[sheet - 1];
                return relationId;
            }

            for (let { name, relationId } of sheets) {
                if (name === sheet) return relationId;
            }
        }

        /**
         * @readonly
         * @type {string}
         */
        get xmlContent() {
            let { sheetId, properties, contents } = this,
                { sheet } = this.options,
                { sheets } = this.paths;

            if (!sheetId || !sheets[sheetId]) {
                throw createSheetNotFoundError(sheet, properties.sheets);
            }

            return getXmlContent(sheets[sheetId], contents);
        }

        /**
         * @readonly
         * @type {parsedSheetData}
         */
        get parsedSheet() {
            let { xmlContent: content, values, styles, properties, options } = this;

            return parseSheet(content, values, styles, properties, options);
        }

        /**
         * Read Xlsx contens data
         * @returns {fullData}
         */
        read() {
            let { parsedSheet: sheets, options } = this;

            let { dimensions, cells } = sheets,
                { transformData } = options;

            if (cells.isEmpty) return [];

            let [topLeft, bottomRight] = dimensions,
                { row: maxRow, column: maxCol } = bottomRight;

            let data = new ArrayData(maxRow);

            for (let { row, column, value } of cells) {
                row -= 1;
                column -= 1;
                if (column < maxCol && row < maxRow) {
                    if (!data[row]) data[row] = new ArrayData();
                    data[row][column] = value;
                }
            }

            return transformData ? transformData(data) : data;
        }

        /**
         * Open and read Xlsx file data
         * @param {File | Blob | ArrayBuffer} file
         * @param {baseOptions} options
         * @returns
         */
        static async read(file, options) {
            options = Object.assign({ sheet: 1 }, options);
            const contents = await getXlsContents(file);
            let xlsxFile = new XLSX(contents, options, _token);

            return xlsxFile.read();
        }

        /**
         * Create and download file Xlsx
         *
         * @overload
         * @param {sheetData} data
         * @param {string} filename
         * @returns {void}
         */ /**
         * Create and download file Xlsx with custom sheetname
         *
         * @overload
         * @param {sheetData} data
         * @param {string} filename
         * @param {string} sheetname
         * @returns {void}
         */
        static write(data, filename, sheetname) {
            return createXlsx({ data, filename, sheetname: sheetname || filename });
        }
    };
})();

export default XLSX;
