
var admin = require("firebase-admin");

var serviceAccount = require("../epicc-admin-firebase-adminsdk-o0h1d-54e583caeb.json");
const shoppdfbucket = "epicc-admin.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: shoppdfbucket
});

const db = admin.firestore();
const questionsRef = db.collection('sheetQuestions');
const modsref = db.collection('sheetMods');

// const shoppdfbucket = "epicc-admin.appspot.com";
// const storageRef = firebase.storage()

const update = async (modName) => {

  const result = await modsref.where('name', '==', modName).get()
  //  console.log("update -> result", result.docs.length)

  const oneShots = result.docs.filter(doc => {

    return true
  })

  oneShots.forEach(async (doc) => {
    //console.log("update -> doc", doc)

    const data = doc.data();
    // console.log("update -> data", data)

    const { name } = data
    // console.log("update -> doc", doc.data())

    const itemUpdate = {
      ...data,

      levels: 2,

      "levelsConfig": [
        {
          "title": "",
          "helpAudio": "https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o/Directions%20Audio%2Fsentrec.direction.mp3?alt=media&token=ca254cf6-3810-4066-9d32-74196c63d385",
          "description": "Level 1 module has been selected. In this module, you will answer questions based on each given sentence heard. ",
          "name": "level 1",
          "helpText": "",
          "image": "https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o/Module%20Selection%20Page%20Images%20%2FSentence%20Recall.PNG?alt=media&token=be9d89ee-fcc5-492f-8b78-a8ea28549199"
        },
        {
          "helpAudio": "https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o/Directions%20Audio%2Fsentrec.direction.mp3?alt=media&token=ca254cf6-3810-4066-9d32-74196c63d385",
          "helpText": "",
          "image": "https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o/Module%20Selection%20Page%20Images%20%2FSentence%20Recall.PNG?alt=media&token=be9d89ee-fcc5-492f-8b78-a8ea28549199",
          "name": "level 2",
          "title": "",
          "description": "Level 2 module has been selected. In this module, you will answer questions based on each given sentence heard. "
        },

      ]
    }

    await modsref.doc(doc.id).update({
      ...itemUpdate,
    });

    console.log("update -> itemUpdate", JSON.stringify(itemUpdate,null,4))

  })

}

update('Conversation Starter')