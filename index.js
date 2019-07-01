const { shouldGetCell } = require("./shouldGetCell");

const { buildQuestionData } = require("./buildQuestionData");

if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('Expressive Language Final.xlsx');

const { SheetNames, Sheets } = workbook;

const cols = ["A", "B", "C", "D", "E"];

SheetNames.map(sheetName => {
    const sheet = Sheets[sheetName]
    const questions = [];
    const realCols = cols
        .filter((colName) => sheet[`${colName}1`] && sheet[`${colName}1`].v)

        .forEach((colName, colIndex) => {
            let count = 1;
            while (shouldGetCell({ sheet, sheetName, colName, count })) {
                const v = sheet[`${colName}${count}`].v
                buildQuestionData({ v, colName, sheetName, count, questions })
                count++;
            }
        })

    return {
        sheetName,
        questions
    }
})