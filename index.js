const { shouldGetCol } = require("./shouldGetCol");
const { shouldGetRow } = require("./shouldGetRow");
const { buildQuestionData } = require("./buildQuestionData");

if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('Expressive Language Final.xlsx');

const { SheetNames, Sheets } = workbook;

SheetNames.map(sheetName => {
    const sheet = Sheets[sheetName];
    const questions = [];
    let row = 1;
    while (shouldGetRow({ sheet, sheetName, row })) {
        let colIndex = 0;
        let colName = String.fromCharCode(65 + colIndex);
        while (shouldGetCol({ sheet, sheetName, colIndex, colName, row })) {
            const v = sheet[`${colName}${row}`].v;
            buildQuestionData({ v, colName, sheetName, row, questions, colIndex });
            colIndex++;
            colName = String.fromCharCode(65 + colIndex);
        }
        row++;
    }
    console.log("TCL: row", questions);
    return {
        sheetName,
        questions,
    }
})