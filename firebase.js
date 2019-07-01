const firebase = require('firebase');

// See firebase setup in above google firebase documentation url
const config = {
    apiKey: "AIzaSyDHlAkIRznfoY4_j-_fGZ-ze0RCgqtRK4E",
    authDomain: "epicc-admin.firebaseapp.com",
    databaseURL: "https://epicc-admin.firebaseio.com",
    projectId: "epicc-admin",
    storageBucket: "epicc-admin.appspot.com",
    messagingSenderId: "344476975262",
    appId: "1:344476975262:web:e14725d711f2fce9"
};
firebase.initializeApp(config);
module.exports = firebase;