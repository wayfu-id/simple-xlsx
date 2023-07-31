import generateContentTypes from "./contentTypes.js";
import generateRelationships from "./relationship.js";
import generateWorkbook from "./workbook.js";
import generateWorksheet from "./worksheet.js";

const contentTypes = generateContentTypes();
const relationships = generateRelationships();
const workBook = (sheetName = "Sheet1", sheetId = "rId3") => {
    return {
        data: generateWorkbook(sheetName, sheetId),
        rels: generateRelationships("worksheet"),
    };
};
// const workSheet = generateWorksheet;

export { contentTypes, relationships, workBook, generateWorksheet as workSheet };
