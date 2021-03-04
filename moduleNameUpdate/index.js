
var admin = require("firebase-admin");

var serviceAccount = require("../epicc-admin-firebase-adminsdk-o0h1d-54e583caeb.json");
const shoppdfbucket = "epicc-admin.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: shoppdfbucket
});

const db = admin.firestore();
const questionsRef = db.collection('sheetQuestions');

// const shoppdfbucket = "epicc-admin.appspot.com";
// const storageRef = firebase.storage()

const update = async () => {

  const result = await questionsRef.where('moduleName', '==', 'Daily Math').get()
  //  console.log("update -> result", result.docs.length)

  const oneShots = result.docs.filter(doc => {

    const data = doc.data();
    console.log("update -> data", data)
    const { questionSet = [] } = data;
    return questionSet.length == 0
  })

  oneShots.forEach(async (doc) => {
    //console.log("update -> doc", doc)

    const data = doc.data();
    // console.log("update -> data", data)

    const { challangePicture, wrongAnswerText, challangeTime, challangeText, answerText } = data
    // console.log("update -> doc", doc.data())

    const questionSet = [{
      challangePicture,
      wrongAnswerText,
      challangeTime,
      challangeText,
      answerText,
    }]
    const itemUpdate = {
      questionSet
    }

    // await questionsRef.doc(doc.id).update({
    //   ...itemUpdate,
    // });

    console.log("update -> itemUpdate", questionSet)

  })


}


update()
