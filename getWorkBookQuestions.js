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

const loadAll = false

//const goodSheets = ['Object Labeling 1', 'Object Labeling 3', 'Yes and No 1', 'Yes and No 2'];

const goodSheets = ['Categories 1','Conversation Starter','Picture Description'];

const getWorkBookQuestions = async (workbook, bookName) => {
    const { SheetNames, Sheets } = workbook;
    console.log("TCL: getWorkBookQuestions ->  SheetNames, Sheets",  SheetNames)
    const SheetQuestions = SheetNames.filter(name => {
        // console.log("TCL: getWorkBookQuestions -> name", name)
        return loadAll || goodSheets.indexOf(name) > -1
    })
        .map(sheetName => {
        console.log("TCL: getWorkBookQuestions -> sheetName", sheetName)
            const sheet = Sheets[sheetName];
            const questions = [];
            let row = 1;
            while (shouldGetRow({ sheet, sheetName, row, bookName })) {
                let colIndex = 0;
                let colName = String.fromCharCode(65 + colIndex);
                while (shouldGetCol({ sheet, sheetName, colIndex, colName, row, bookName })) {
                    const cell = sheet[`${colName}${row}`] || {};
                    let v = cell.v;

                    if (typeof v == 'num') {

                        v = `${v}`
                    }
                    buildQuestionData({ v, colName, sheetName, row, questions, colIndex, bookName,sheet });
                    colIndex++;
                    colName = String.fromCharCode(65 + colIndex);
                }
                row++;
            }
            //modsRef.doc().set({ name: sheetName, area: bookName });
            mcount++;
            //console.log("TCL: mcount", sheetName, mcount)
            return {
                sheetName,
                questions,
            };
        });

    require('fs').writeFileSync('./converStartANDPicDes.js', `
    
    const set = ${JSON.stringify(SheetQuestions,null,2)};
    
    `)

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
