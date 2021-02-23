const firebase = require('../firebase');


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
var path = require('path')
var os = require('os')
var axios = require('axios')
var fs = require('fs')

const SheetQuestions = require('../fm')

var gm = require('gm');

var bucket = admin.storage().bucket();

//const imagemagick = require('imagemagick-native')
//const storageRef = firebase.storage()

const password = process.env.EDIT_PASSWORD

const signIn = async () => {
  try {
    const response = await firebase.auth().signInWithEmailAndPassword('isethguy@gmail.com', password)
  } catch (error) {
    console.log("signIn -> error", error)
  }
}

const files = () => {

  fs.readdir(`${__dirname}/pngs/`, (err, files) => {
    files.forEach(file => {

      //  const data =   fs.existsSync(`${__dirname}/pngs/${file}`)
      //  console.log("files -> data", data)

      fs.rename(`${__dirname}/pngs/${file}`, `${__dirname}/pngs/${file.replace('%20', ' ')}`, (err, data) => {

        console.log("files -> err,data", err, data)

      })

    });
  });
}


const getPath = (url) => {

  const [parts] = url.split('?')



  const path = decodeURIComponent(parts.replace('https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o', ''))
  console.log("getPath -> path", path)


  const [name] = path.split('/').reverse()


  const [n, ext] = name.split('.')

  return { path, name, ext, n };
}

const update = async () => {

  //await signIn()

  // const there = fs.existsSync(pngname)
  // console.log("update -> there", there)
  // const bucket = storageRef.bucket(shoppdfbucket);
  // let imageDest = `/funtionalPngs/${pngname}`;
  // await bucket.upload(imagePath, {
  //   destination: imageDest,
  //   metadata: {
  //     // firebaseStorageDownloadTokens: uuid
  //     metadata,
  //   },
  // });
  // const [imageUrl] = await bucket
  //   .file(imageDest)
  //   .getSignedUrl({
  //     action: 'read',
  //     expires: '03-09-2491'
  //   });  //  console.log("update -> result", result.docs.length)

  let count = 0
  const mods = [
    'Correct change',
    'Bill Coin Total',
    'Budgeting 1',
    'Budgeting 2',
    'Daily Math',
  ]
    .map(async (sheetName) => {

      const moduleName = sheetName.replace('line', '').trim()

      const result = await questionsRef.where('moduleName', '==', moduleName).get()

      result.docs.map(async (question) => {
        const images = {}

        const data = question.data()

        const { challangePicture, billImage, questionSet = [], moduleName } = data;

        const [one] = questionSet;

        const cp = one ? one.challangePicture : challangePicture

        console.log("update -> challangePicture")

        images.challangePicture = cp;

        images.billImage = billImage;

        const newData = {
          ...data,
        }

        if (billImage) {
          newData.oldbillImage = billImage
          count++
          //  const trimmed = await convertAndTrim(billImage)

          //  newData.billImage = trimmed
        }
        if (challangePicture) {
          count++
          newData.oldchallangePicture = challangePicture
          //  const trimmed = await convertAndTrim(challangePicture)

          //   newData.challangePicture = trimmed
        }

      })


    })


  await Promise.all(mods)
  console.log("update -> result", count)


  // SheetQuestions.forEach(({ sheetName, questions }) => {
  //   console.log("update -> moduleName", moduleName)

  //   // console.log("TCL: sheetName", sheetName)
  //   questions.forEach(async (questionData) => {
  //     //  console.log("uploadNewQuestions -> questionData", questionData)
  //     // console.log("questionData", questionData)
  //     // console.log("TCL: questionData", questionData)

  //     //    console.log("update -> moduleName", moduleName)

  //     //  await questionsRef.doc().set({ ...questionData, areaOfConcentraion: 'Cognition', moduleName })

  //     //console.log("TCL: qcount", questionData);
  //   });
  // });
}
update()

const trimImage = (imagePath, toPath) => {

  return new Promise((resolve, reject) => {


    gm(imagePath)

      // Invoke trim function  
      .trim()

      // Process and Write the image 

      .write(toPath, function (err) {
        if (!err) {
          console.log('err', err);


          return reject(err)
        }
        return resolve(toPath)
      });

  })


}


const tryTrim = async (imagePath) => {
  const toPath = imagePath.replace('-0', '').replace('imageConversions', 'imageConversions/trimed');
  try {
    const trimed = await trimImage(imagePath)
    return trimed
  } catch (error) {
    console.log("tryTrim -> error", error)
    return toPath

  }

}


const convertAndTrim = async (url) => {

  const info = getPath(url)


  const { path, name, ext, n } = info;

  if (ext == 'pdf') {
    const { tempFilePath } = await downloadPdf({ href: url, name })
    console.log("convertAndTrim -> tempFilePath", tempFilePath)

    const pdfImage = new PDFImage(tempFilePath);
    const imagePath = await pdfImage.convertPage(0);


    const trimmed = await tryTrim(imagePath)

    await unlinkAsync(tempFilePath);
    await unlinkAsync(imagePath)

  } else {
    const { tempFilePath } = await downloadPdf({ href: url, name })
    console.log("convertAndTrim -> tempFilePath", tempFilePath)

    const trimmed = await tryTrim(imagePath)

    await unlinkAsync(tempFilePath);
  }



}



const unlinkAsync = (path) => {
  return new Promise((resolve, reject) => {
    fs.unlink(path, (err) => {
      if (err) {
        reject(err)
      }
      resolve(path)
    });
  }).catch((e) => {
    console.log("unlinkAsync -> e", e)
  })
}



const downloadPdf = async (props) => {
  try {
    const { href, name } = props;
    console.log("downloadPdf -> name", name)

    // path.dirname()
    const tempFilePath = path.join(__dirname, name);
    const pdfResponse = await axios({
      url: href,
      method: 'GET',
      responseType: 'arraybuffer',
    });
    await writeFileAsync(tempFilePath, pdfResponse.data);
    return {
      tempFilePath,
      name,
      ...props,
    };
  }
  catch (error) {
    console.log("TCL: downloadPdf -> error", error);
  }
};

const writeFileAsync = async (path, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(path, data, (err) => {
      if (err) {
        rej(err);
      }
      res({ path, data });
    });
  });
};