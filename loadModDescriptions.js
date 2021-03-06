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
const goodSheets = ['Language Directions'];

//const goodSheets = ['Sentence Comprehension 1', 'Sentence Comprehension 2', 'Sentence Comprehension 3'];

const mods = {}

const loadModDescriptions = async (workbook, bookName) => {
    const { SheetNames, Sheets } = workbook;
    const SheetQuestions = SheetNames.filter(name => {
        // console.log("TCL: loadModDescriptions -> name", name)
        return loadAll || goodSheets.indexOf(name) > -1
    })
        .map(sheetName => {
            const sheet = Sheets[sheetName];
            const questions = [];


            let row = 1;
            while (row <28) {
                let colIndex = 0;
                let colName = String.fromCharCode(65 + colIndex);
                const name = sheet[`${'A'}${row}`].v
                const description = sheet[`${'B'}${row}`].v
               //console.log("TCL: loadModDescriptions -> name", name, description)
               console.log("TCL: loadModDescriptions -> mods", name)

                const mod = mods[name];
                if (!mod) {

                    mods[name] = {
                        name,
                        description: description
                    }

                } else {

                    const levelsConfig = [...(mod.levelsConfig || [{description:mod.description}])]
                    levelsConfig.push({
                        description: description
                    })
                    //mod.levelsConfig = levelsConfig;
                    if (mod.description) {
                        delete mod.description
                    }

                    mods[name] ={
                        name,
                        levelsConfig
                    }
                }
                // while (shouldGetCol({ sheet, sheetName, colIndex, colName, row, bookName })) {
                //     const cell = sheet[`${colName}${row}`] || {};
                //     const v = cell.v;
                //     if(colIndex ==0){
                //         mod.name = 
                //     }
                //     console.log("TCL: loadModDescriptions -> v ", v)


                //     // buildQuestionData({ v, colName, sheetName, row, questions, colIndex, bookName });
                //     colIndex++;
                //     colName = String.fromCharCode(65 + colIndex);
                // }
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

    console.log("TCL: require", mods)
    require('fs').writeFileSync('./mods.js', JSON.stringify(mods))

    // SheetQuestions.forEach(({ sheetName, questions }) => {
    //     console.log("TCL: sheetName", sheetName)
    //     questions.forEach(async (questionData) => {
    //         // console.log("TCL: questionData", questionData)
    //         //await questionsRef.doc().set({ ...questionData, areaOfConcentraion: bookName })
    //         qcount++;
    //         // console.log("TCL: qcount", qcount);
    //     });
    // });
    acount++;
    //await areasRef.doc().set({ name: bookName })
    console.log("TCL: acount", acount)
};
exports.loadModDescriptions = loadModDescriptions;
