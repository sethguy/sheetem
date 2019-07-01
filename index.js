const { shouldGetCol } = require("./shouldGetCol");
const { shouldGetRow } = require("./shouldGetRow");
const { buildQuestionData } = require("./buildQuestionData");

if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('Receptive Language Final.xlsx');

const { SheetNames, Sheets } = workbook;

const SheetQuestions = SheetNames.map(sheetName => {
    const sheet = Sheets[sheetName];
    const questions = [];
    let row = 1;
    while (shouldGetRow({ sheet, sheetName, row })) {
        let colIndex = 0;
        let colName = String.fromCharCode(65 + colIndex);
        while (shouldGetCol({ sheet, sheetName, colIndex, colName, row })) {
            const cell =sheet[`${colName}${row}`] || {}
            const v = cell.v;
            buildQuestionData({ v, colName, sheetName, row, questions, colIndex });
            colIndex++;
            colName = String.fromCharCode(65 + colIndex);
        }
        row++;
    }

    return {
        sheetName,
        questions,
    }
})


console.log(SheetQuestions.map( ({questions,sheetName})=>({sheetName,l:questions.length}) ))