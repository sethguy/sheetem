const firebase = require('../firebase');
const db = firebase.firestore();
const questionsRef = db.collection('sheetQuestions');
const areasRef = db.collection('sheetAreas');
const modsRef = db.collection('sheetMods');
var PDFImage = require("pdf-image").PDFImage;
var path = require('path')
var os = require('os')
var axios = require('axios')
var fs = require('fs')

// const shoppdfbucket = "epicc-admin.appspot.com";
// const storageRef = firebase.storage()

const signIn = async () => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword('isethguy@gmail.com', 'sethwins')
  } catch (error) {
    console.log("signIn -> error", error)
  }
}

const update = async () => {

  await signIn()

  const result = await questionsRef.where('moduleName', '==', 'Object Description 1').get()
  //  console.log("update -> result", result.docs.length)

  result.docs.forEach(async (doc) => {
    //console.log("update -> doc", doc)

    const data = doc.data();
    console.log("update -> data", data)


    // console.log("update -> doc", doc.data())


    questionsRef.doc(doc.id).update({ moduleName: 'Object Description' })


  })


}


update()
