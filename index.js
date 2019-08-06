const { getWorkBookQuestions } = require("./getWorkBookQuestions");
const firebase = require('./firebase');
const db = firebase.firestore();

//Object Naming
const {loadModDescriptions}  = require("./loadModDescriptions");

const tagsRef = db.collection('questionTags');
const questionsRef = db.collection('sheetQuestions');
const modsRef = db.collection('sheetMods');
const fs = require('fs');

if (typeof require !== 'undefined') XLSX = require('xlsx');

const loadWorkBookQuestion = () => {
    const books = fs.readdirSync('./books')
    books.forEach((bookName) => {
        var workbook = XLSX.readFile(`./books/${bookName}`);
        getWorkBookQuestions(workbook, bookName.replace('.xlsx', ''))
    })
}

// const countWorkBookQuestions = async () => {
//     const firebase = require('./firebase');
//     const db = firebase.firestore();
//     const questionsRef = db.collection('sheetQuestions');
//     const { docs } = questionsRef.get();
//     console.log(docs.length)
// }

 const loadQuestionSheet = () => {
  var workbook = XLSX.readFile(`./books/Receptive Language Final.xlsx`);
  getWorkBookQuestions(workbook,'Receptive Language');
}

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



// const db = firebase.firestore();
// const questionsRef = db.collection('sheetQuestions');

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





/**
 

var storage = firebase.storage();

var sizeOf = require('image-size');

const items = [];

// Create a storage reference from our storage service
const storageRef = storage.ref();

(async () => {

  const results = await storageRef.listAll()

  results.prefixes.forEach(async (folderRef) => {
    // All the prefixes under listRef.
    // You may call listAll() recursively on them.

    const folderRefRes = await folderRef.listAll();
    // console.log("TCL: folderRef", folderRef.name);

    // console.log("TCL: folderRefRes", folderRefRes.items.map(item => item.name))

    folderRefRes.items.forEach(function (itemRef) {
      console.log("TCL: itemRef", itemRef)
        // All the items under listRef.

        var spaceRef = storageRef.child(itemRef.fullPath);
        console.log("TCL: spaceRef", spaceRef)

      });

  });

})();



 *  */