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
    var workbook = XLSX.readFile(`./books/Receptive Language Final.xlsx`);
    getWorkBookQuestions(workbook, "Receptive Language")
}


loadQuestionSheet();


// const updatequestionSet = async () => {
//     const set = await questionsRef.where('moduleName', '==', 'Yes and No').get()
//     console.log("TCL: updatequestionSet -> set")

//     set.docs.map(async (doc) => {

//         //  await  questionsRef.doc(doc.id).update({moduleName:'Yes and No 3'})

//     })

// }







// const db = firebase.firestore();
// const questionsRef = db.collection('sheetQuestions');


// SheetQuestions.forEach(({ sheetName, questions }) => {
//   //console.log("TCL: sheetName", sheetName)
//   questions.forEach(async (questionData) => {
//    // await questionsRef.doc().set({ ...questionData, areaOfConcentraion: "Communication" })
//   // console.log("TCL: questionData", questionData)

//   });
// });


// (async () => {
//   const f1 = await questionsRef.where('moduleName', '==', 'Sentence Comprehension 1').get();
//   const f2 = await questionsRef.where('moduleName', '==', 'Sentence Comprehension 2').get();
//   const f3 = await questionsRef.where('moduleName', '==', 'Sentence Comprehension 3').get();

//   const set = [...f1.docs, ...f2.docs, ...f3.docs,];
//   console.log("TCL: set", set)
//   set.forEach(async (doc) => {

//     await questionsRef.doc(doc.id).delete()
//     console.log("TCL: data", doc.data())

//   })

// })()
