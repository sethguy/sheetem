const firebase = require('../firebase');

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

const getParts = (url) => {

  const [parts] = url.split('?')

  const path = parts.replace('https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o', '')

  const segs = path.split('/')

  const [name] = segs.reverse()
  //console.log("getPath -> path", name, url)


  const [n, ext] = name.split('.')

  return { path, name, ext, n, segs: [...segs.reverse().filter(seg => seg)] }

}

const getPath = (url) => {

  const decoded = getParts(decodeURIComponent(url))

  const info = getParts(url)

  return { ...info, decoded };
}

const update = async () => {

  //await signIn()



  const questions = []

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

        await updateQUestionImaget(question)


        //  questions.push(question)


      })


    })


  await Promise.all(mods)
  console.log("update -> result", count)

  // i = 0

  // while (i < questions.length) {


  //   const question = questions[i]


  //   try {

  //    // await wait(800)
  //     await updateQUestionImaget(question)

  //   } catch (error) {
  //     console.log("update -> error", error)

  //   } finally {
  //     console.log("update i", i,questions.length)

  //     i++
  //   }





  // }

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



const getNewUrl = async (props) => {

  const { path, fileInfo } = props;

  const { decoded } = fileInfo;

  const { segs, name } = decoded

  const [first, ...rest] = segs;

  const safefolder = [first.replace(`${first}`, `trimmed-${first}`), ...rest].join('/').replace('.pdf', '.png')
  console.log("getNewUrl -> safefolder", safefolder)

  try {

    //   const bucket = storageRef.bucket(shoppdfbucket);
    let imageDest = safefolder
    await bucket.upload(path, {
      destination: imageDest,
      metadata: {
        // firebaseStorageDownloadTokens: uuid
        // name,
      },
    });
    //const [imageUrl] = 
    await bucket
      .file(imageDest).makePublic()
    // .getSignedUrl({
    //   action: 'read',
    //   expires: '03-09-2491'
    // });  //  console.log("update -> result", result.docs.length)
    const url = await bucket
      .file(imageDest).publicUrl()
    console.log("getNewUrl -> url", url)
    return url
  } catch (error) {
    console.log("getNewUrl -> error", error)

  }




}

const updateQUestionImaget = async (question) => {


  const images = {}

  const data = question.data()

  const { challangePicture, billImage, questionSet = [], moduleName } = data;

  const [one] = questionSet;

  const cp = one ? one.challangePicture : challangePicture


  images.challangePicture = cp;

  images.billImage = billImage;

  const newData = {
    ...data,
  }

  if (billImage) {
    newData.oldbillImage = billImage
    const fileInfo = getPath(billImage)

    const { decoded } = fileInfo;

    const { segs } = decoded;

    const [first, ...rest] = segs;
    const safefolder = encodeURIComponent([first.replace(`${first}`, `trimmed-${first}`), ...rest].join('/').replace('.pdf', '.png'))

    const nwUrl = `https://storage.googleapis.com/epicc-admin.appspot.com/${safefolder}`

    // const there = await isThere(nwUrl)
    // console.log("updateQUestionImaget -> there", there, path)


    // const trimmed = await convertAndTrim(billImage)
    // const result = await testAsync(trimmed)
    // if (!result) {
    //   console.log(" bad trim -> billImage", billImage)
    // }





    // const newUrl = await getNewUrl({ path: trimmed, fileInfo })

    newData.billImage = nwUrl
  }
  if (challangePicture) {

    const fileInfo = getPath(challangePicture)

    const { decoded } = fileInfo;

    const { segs, path, } = decoded;

    const [first, ...rest] = segs;
    const safefolder = encodeURIComponent([first.replace(`${first}`, `trimmed-${first}`), ...rest].join('/').replace('.pdf', '.png'))

    const nwUrl = `https://storage.googleapis.com/epicc-admin.appspot.com/${safefolder}`

    // const there = await isThere(nwUrl)
    // console.log("updateQUestionImaget -> there", there, path)
    newData.oldchallangePicture = challangePicture
    // const trimmed = await convertAndTrim(challangePicture)
    // const result = await testAsync(trimmed)
    // if (!result) {
    //   console.log(" bad trim -> challangePicture", challangePicture)
    // }

    // const newUrl = await getNewUrl({ path: trimmed, fileInfo })

    newData.challangePicture = nwUrl
  }


  //await questionsRef.doc(question.id).update(newData)

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
  console.log("getNewUrl -> imageUrl", imageUrl)
  console.log("getNewUrl -> imageUrl", imageUrl)


}


const tryTrim = async (imagePath) => {
  const toPath = imagePath.replace('-0', '').replace('imageConversions', 'imageConversions/trimed');
  try {
    const trimed = await trimImage(imagePath, toPath)
    return trimed
  } catch (error) {
    // console.log("tryTrim -> error", error)
    return toPath

  }

}


const testAsync = (path) => {

  return new Promise((resolve, reject) => {



    fs.exists(path, (here) => {


      resolve(here)


    })




  })


}



const convertAndTrim = async (url) => {

  const info = getPath(url)

  const { path, name, ext, n } = info;

  const result = await downloadPdf({ href: url, name })
  //await wait(500)


  //const { tempFilePath } = result

  // return tempFilePath

  if (!result) {
    return
  } else {

    const { tempFilePath } = result



    const isThere = await testAsync(tempFilePath)
    // console.log("convertAndTrim -> isThere", isThere, tempFilePath)


    if (ext == 'pdf') {
      // console.log("convertAndTrim -> tempFilePath", tempFilePath)


      try {
        const pdfImage = new PDFImage(tempFilePath);
        const imagePath = await pdfImage.convertPage(0);
        // await unlinkAsync(imagePath)
        const trimmed = await tryTrim(imagePath)

        return trimmed
      } catch (error) {
        console.log("convertAndTrim  PDFImage -> error", url, error)

      } finally {



        //   await unlinkAsync(tempFilePath);

      }


    } else {
      // console.log("convertAndTrim -> tempFilePath", tempFilePath)

      const trimmed = await tryTrim(tempFilePath)

      // await unlinkAsync(tempFilePath);

      return trimmed
    }

  }

}

const isThere = async (url) => {

  try {
    const pdfResponse = await axios({
      url,
      method: 'GET',
      responseType: 'arraybuffer',
    });

    return pdfResponse.data.length
  } catch (error) {
    console.log("isThere -> error", error.message, url)

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



// const go = async () =>{

//   const result = await downloadPdf({
//     name: 'poop.pdf',
//     href: 'https://firebasestorage.googleapis.com/v0/b/epicc-admin.appspot.com/o/bills%20and%20coins(money)%2F%2410%20Bill.pdf?alt=media&token=78d65037-c779-4371-be73-84de9b570046'
//   })

//   try {
//     const pdfImage = new PDFImage('./poop.pdf');
//     const imagePath = await pdfImage.convertPage(0);
//   } catch (error) {
//     console.log("error", error)

//   }



// }
// (async () => {

//  await go()


// })()


