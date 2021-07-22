
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

const pathways = db.collection('Pathways');
console.log("pathways", pathways)
const sheetAreas = db.collection('sheetAreas');
console.log("sheetAreas", sheetAreas)


// const shoppdfbucket = "epicc-admin.appspot.com";
// const storageRef = firebase.storage()

const run = async (modName) => {

  const comAreas = await sheetAreas.where('pathway', '==', 'Communication').get()
  console.log("run -> comAreas", comAreas.docs.map(doc=>doc.data().name))

  const cognitionAreas = await sheetAreas.where('pathway', '==', 'cognition').get()
  console.log("run -> cognitionAreas", cognitionAreas.docs.map(doc=>doc.data().name))




}

run('Conversation Starter')