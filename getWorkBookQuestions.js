const firebase = require('./firebase');
const db = firebase.firestore();

const tagsRef = db.collection('questionTags');
const questionsRef = db.collection('sheetQuestions');

const { shouldGetCol } = require("./shouldGetCol");
const { shouldGetRow } = require("./shouldGetRow");
const { buildQuestionData } = require("./buildQuestionData");
let qcount = 0;
const getWorkBookQuestions = (workbook, bookName) => {
    const { SheetNames, Sheets } = workbook;

    const SheetQuestions = SheetNames.map(sheetName => {
        const sheet = Sheets[sheetName];
        const questions = [];
        let row = 1;
        while (shouldGetRow({ sheet, sheetName, row, bookName })) {
            let colIndex = 0;
            let colName = String.fromCharCode(65 + colIndex);
            while (shouldGetCol({ sheet, sheetName, colIndex, colName, row, bookName })) {
                const cell = sheet[`${colName}${row}`] || {};
                const v = cell.v;
                buildQuestionData({ v, colName, sheetName, row, questions, colIndex, bookName });
                colIndex++;
                colName = String.fromCharCode(65 + colIndex);
            }
            row++;
        }
        return {
            sheetName,
            questions,
        };
    })
        .forEach(({ sheetName, questions }) => {
            //  await tagsRef.set({name})
            questions.forEach(async (questionData) => {
                 await questionsRef.doc().set({ ...questionData, areaOfConcentraion: bookName })
                qcount++;
                console.log("TCL: qcount", qcount, questionData, bookName);
            });
        });
};
exports.getWorkBookQuestions = getWorkBookQuestions;
