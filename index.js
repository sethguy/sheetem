const { getWorkBookQuestions } = require("./getWorkBookQuestions");
const firebase = require('./firebase');
const db = firebase.firestore();

const tagsRef = db.collection('questionTags');
const questionsRef = db.collection('sheetQuestions');
const modsRef = db.collection('sheetMods');
const fs = require('fs');

if (typeof require !== 'undefined') XLSX = require('xlsx');

// const loadWorkBookQuestion = () => {
//     const books = fs.readdirSync('./books')
//     books.forEach((bookName) => {
//         var workbook = XLSX.readFile(`./books/${bookName}`);
//         getWorkBookQuestions(workbook, bookName.replace('.xlsx', ''))
//     })
// }

// const countWorkBookQuestions = async () => {
//     const firebase = require('./firebase');
//     const db = firebase.firestore();
//     const questionsRef = db.collection('sheetQuestions');
//     const { docs } = questionsRef.get();
//     console.log(docs.length)
// }

const loadQuestionSheet = () => {
    const books = fs.readdirSync('./books');

    var workbook = XLSX.readFile(`./books/Expressive Language Final.xlsx`);
    getWorkBookQuestions(workbook, "Expressive Language")
}


// const updatequestionSet = async () => {
//     const set = await questionsRef.where('moduleName', '==', 'Yes and No').get()
//     console.log("TCL: updatequestionSet -> set")

//     set.docs.map(async (doc) => {

//         //  await  questionsRef.doc(doc.id).update({moduleName:'Yes and No 3'})

//     })

// }



