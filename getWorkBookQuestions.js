const firebase = require('./firebase');
const db = firebase.firestore();

const tagsRef = db.collection('questionTags');
const questionsRef = db.collection('sheetQuestions');
const modsRef = db.collection('sheetMods');
const areasRef = db.collection('sheetAreas');

const { shouldGetCol } = require("./shouldGetCol");
const { shouldGetRow } = require("./shouldGetRow");
const { buildQuestionData } = require("./buildQuestionData");
let qcount = 0;
let mcount = 0;
let acount = 0;
const getWorkBookQuestions = async (workbook, bookName) => {
    await areasRef.doc().set({ name: bookName })

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
        modsRef.doc().set({ name: sheetName });
        mcount++;
        console.log("TCL: mcount", mcount)
        return {
            sheetName,
            questions,
        };
    })
        .forEach(({ sheetName, questions }) => {
            questions.forEach(async (questionData) => {
                await questionsRef.doc().set({ ...questionData, areaOfConcentraion: bookName })
                qcount++;
                console.log("TCL: qcount", qcount, questionData, bookName);
            });
        });
    acount++;
    console.log("TCL: acount", acount)
};
exports.getWorkBookQuestions = getWorkBookQuestions;
