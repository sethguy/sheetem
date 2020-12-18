const firebase = require('./firebase');
const db = firebase.firestore();
const questionsRef = db.collection('sheetQuestions');
const areasRef = db.collection('sheetAreas');
const modsRef = db.collection('sheetMods');


const signIn = async () => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword('isethguy@gmail.com', 'sethwins')
  } catch (error) {
    console.log("signIn -> error", error)
  }
}


const update = async () => {


//  const result = await modsRef.where('name','==','Med Management').get()
//  console.log("update -> result", result.docs.length)

//  const mod =result.docs[0];


 // modsRef.doc(area.docs[0].id).update({ levelsConfig })
  //  areasRef.doc(area.docs[0].id).update({modshape: area.docs[0].data().modShape})
//  const badguys1 = await questionsRef.where('moduleName','==','Face & Name Recall').get()
  // const badguys2 = await questionsRef.where('moduleName','==','Voicemail Recall').get()

   //const allbadd = [...badguys1.docs];



  // console.log("uploadNewQuestions -> allbadd", allbadd.length)


  // allbadd.map(async(item)=>{
  //   console.log("uploadNewQuestions -> item", item)

  // //  await questionsRef.doc(item.id)
   
   
  // //  .update({
  // //  })

  //  console.log("uploadNewQuestions -> done", item)

  // })
  // // SheetQuestions.forEach(({ sheetName, questions }) => {
  // //   // console.log("TCL: sheetName", sheetName)
  // //   questions.forEach(async (questionData) => {
  // //     console.log("uploadNewQuestions -> questionData", questionData)
  // //     // console.log("questionData", questionData)
  // //     // console.log("TCL: questionData", questionData)
  // //   // await questionsRef.doc().set({ ...questionData, areaOfConcentraion: 'Cognition', moduleName: sheetName })

  // //     console.log("TCL: qcount", questionData);
  // //   });
  // // });
}
const levelsConfig = [
  {
    "description": "",
    "helpAudio": "https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o/Directions%20Audio%2Fobjrecall.direction.mp3?alt=media&token=2cb6b557-59d8-4055-be06-1bf4134ed511",
    "helpText": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o/blacksquare.png?alt=media&token=59a67886-a764-4c5c-af30-2651820b7a4a3-4fb3-bcda-30d955447c64",
    "name": "level 1",
    "title": ""
  },
  {
    "description": "",
    "helpAudio": "https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o/Directions%20Audio%2Fobjrecall.direction.mp3?alt=media&token=2cb6b557-59d8-4055-be06-1bf4134ed511",
    "helpText": "",
    "image": "https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o/blacksquare.png?alt=media&token=59a67886-a764-4c5c-af30-2651820b7a4a",
    "name": "level 2",
    "title": ""
  },

]