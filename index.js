const { getWorkBookQuestions } = require("./getWorkBookQuestions");

const fs = require('fs');

if (typeof require !== 'undefined') XLSX = require('xlsx');

const loadWorkBookQuestion = () => {
    const books = fs.readdirSync('./books')
    books.forEach((bookName) => {
        var workbook = XLSX.readFile(`./books/${bookName}`);
        getWorkBookQuestions(workbook, bookName.replace('.xlsx', ''))
    })
}

const countWorkBookQuestions = async () => {
    const firebase = require('./firebase');
    const db = firebase.firestore();
    const questionsRef = db.collection('sheetQuestions');
    const { docs } = questionsRef.get();
    console.log(docs.length)
}

