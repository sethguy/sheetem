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


const sets = [];

const goodSheets = ['Object Labeling 1', 'Object Labeling 3', 'Yes and No 1', 'Yes and No 2'];

const getWorkBookQuestions = async (workbook, bookName) => {
    const { SheetNames, Sheets } = workbook;
    const SheetQuestions = SheetNames.filter(name => {
   // console.log("TCL: getWorkBookQuestions -> name", name)


        return goodSheets.indexOf(name) >-1

    }).map(sheetName => {
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
        //modsRef.doc().set({ name: sheetName, area: bookName });
        mcount++;
        console.log("TCL: mcount", sheetName, mcount)
        return {
            sheetName,
            questions,
        };
    });

    require('fs').writeFileSync('./fountain.js', JSON.stringify(SheetQuestions))


    SheetQuestions.forEach(({ sheetName, questions }) => {
        console.log("TCL: sheetName", sheetName)
        questions.forEach(async (questionData) => {
            // console.log("TCL: questionData", questionData)
            //await questionsRef.doc().set({ ...questionData, areaOfConcentraion: bookName })
            qcount++;
            // console.log("TCL: qcount", qcount);
        });
    });
    acount++;
    //await areasRef.doc().set({ name: bookName })
    console.log("TCL: acount", acount)
};
exports.getWorkBookQuestions = getWorkBookQuestions;
