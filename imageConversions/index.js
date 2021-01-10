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

const update = async () => {

  await signIn()

  const result = await questionsRef.where('moduleName', '==', 'Functional Reading').get()
  //  console.log("update -> result", result.docs.length)

  result.docs.forEach(async (doc) => {
    //console.log("update -> doc", doc)

    const { questionSet = [] } = doc.data();
    // console.log("update -> doc", doc.data())

    const [one] = questionSet

    const { media = '' } = one;

    const paths = media.split('/')

    const [last] = paths.reverse()

    const querys = last.split('?')

    const [name] = querys;

    if (name.indexOf('.pdf') > -1) {

      // console.log("update -> media", media)
      // console.log("update -> media---9", media.replace('com/o/Functional','com/o/pdfpngx%2FFunctional').replace('Reading%2F','Reading%20').replace('.pdf','.png'))

      const newLink = media.replace('com/o/Functional', 'com/o/pdfpngx%2FFunctional').replace('Reading%2F', 'Reading%20').replace('.pdf', '.png');
      console.log("update -> newLink", newLink)

      questionsRef.doc(doc.id).update({ mediaPng: newLink })

      const justname = decodeURIComponent(name).replace('/', ' ').replace('.pdf', '.png')
      //   console.log("update -> justname", justname)

      const pngname = `${__dirname}/pngs/${justname}`
      //   console.log("update -> pngname", pngname)

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
      //   });

      // uploadFile({media})
    }

  })

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

const uploadFile = async (props) => {
  const { media } = props;
  const getpdfdatapac = {
    metadata: {
      href: media
    },
  };

  const downloadResponse = await downloadPdf(getpdfdatapac);
  console.log("TCL: uploadFile ->  downloadResponse", downloadResponse)
  if (!downloadResponse) {
    return;
  }
  const { tempFilePath, name } = downloadResponse

  const pdfImage = new PDFImage(tempFilePath);
  const imagePath = await pdfImage.convertPage(0);

  //const downloadImageResponse = await getDocPreview(getpdfdatapac)

  //const { imagePath } = downloadImageResponse

  const [extn] = name.split('.').reverse()
  console.log("TCL: uploadFile -> name", name)
  console.log("TCL: uploadFile -> extn", extn)

  try {

  } catch (error) {
    console.log("TCL: ARCHIVE -> error", error);
  }
  finally {
    await unlinkAsync(tempFilePath)
    //  await unlinkAsync(imagePath)
  }
};


const getDocPreview = async (props) => {

  const { metadata = {} } = props;
  const { href, } = metadata;
  const [name] = href.split('/').reverse();
  const [removed] = name.split('?');

  const [extn] = removed.split('.').reverse()
  const tempFilePath = path.join(os.tmpdir(), removed);

  const imagePath = path.join(os.tmpdir(), removed.replace(`.${extn}`, '.png'));

  return new Promise((resolve, reject) => {

    filepreview.generate(tempFilePath, imagePath, function (error) {
      if (error) {
        return reject(error);
      }
      resolve({ imagePath })
      console.log('File preview is' + imagePath);
    });

  })

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
    const { metadata = {} } = props;
    const { href, } = metadata;
    console.log("downloadPdf -> href", href)

    const [name] = href.split('/').reverse();
    const [removed] = name.split('?');
    // path.dirname()
    const tempFilePath = path.join(os.tmpdir(), removed);
    const pdfResponse = await axios({
      url: href,
      method: 'GET',
      responseType: 'arraybuffer',
    });
    await writeFileAsync(tempFilePath, pdfResponse.data);
    return {
      tempFilePath,
      name: removed,
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