const firebase = require('../firebase');
const pdf = require('pdf-poppler');
var gm = require('gm');

const wait = (time) => new Promise((resolve) => { setTimeout(() => resolve(), time) })

var admin = require("firebase-admin");

var serviceAccount = require("../epicc-admin-firebase-adminsdk-o0h1d-54e583caeb.json");
const shoppdfbucket = "epicc-admin.appspot.com";

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  storageBucket: shoppdfbucket
});

const db = admin.firestore();
const questionsRef = db.collection('sheetQuestions');
const areasRef = db.collection('sheetAreas');
const modsRef = db.collection('sheetMods');
var PDFImage = require("pdf-image").PDFImage;
var nodepath = require('path')
var os = require('os')
var axios = require('axios')
var fs = require('fs')

const SheetQuestions = require('../fm')

var gm = require('gm');

var bucket = admin.storage().bucket();


const getParts = (url) => {

  const [parts] = url.split('?')

  const path = parts.replace('https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o', '')

  const segs = path.split('/')

  const [name] = segs.reverse()
  //console.log("getPath -> path", name, url)

  const [n, ext] = name.split('.')

  return { path, name, ext, n, segs: [...segs.reverse().filter(seg => seg)] }

}

const trimImage = (imagePath, toPath) => {

  return new Promise((resolve, reject) => {

    // return resolve(toPath)

    gm(imagePath)

      // Invoke trim function  
      .trim()

      // Process and Write the image 

      .write(toPath, function (err) {
        if (!err) {
          //console.log('err', err);
          return reject(err)
        }
        return resolve(toPath)
      });

  })


}


const tryTrim = async (imagePath) => {
console.log("tryTrim -> imagePath", imagePath)
  
  const toPath = imagePath.replace('.pdf-1', '').replace('/jpg', '/trimed');
  try {
    const trimed = await trimImage(imagePath, toPath)
    return trimed
  } catch (error) {
    // console.log("tryTrim -> error", error)
    return toPath

  }

}


const plopCOnvert = async (tempFilePath) => {

  const { name } = getPath(tempFilePath)

  try {
    const imagePath = `${tempFilePath.replace('pdfs','jpg')}-1.jpg`

    let opts = {
      scale: 2000,
      format: 'jpeg',
      out_dir: nodepath.dirname(tempFilePath.replace('pdfs','jpg')),
      out_prefix: `${name}`,
      page: null
    }

    await pdf.convert(tempFilePath, opts)

    return imagePath
  } catch (error) {
    console.log("plopCOnvert -> error", error)

  }

}


const getPath = (url) => {

  const decoded = getParts(decodeURIComponent(url))

  const info = getParts(url)

  return { ...info, decoded };
}

const update = async () => {

  const files = fs.readdirSync('./pdfs')
  console.log("update -> files", files)


  files.map(async (file) => {

    const filepath = `./pdfs/${file}`

    const imagePath = await plopCOnvert(filepath);

    const trimed = await tryTrim(imagePath)
    console.log("update -> imagePath", imagePath)

  })


}

update()





