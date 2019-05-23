if(typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('Expressive Language Final.xlsx');

const {SheetNames,Sheets} = workbook;

console.log(SheetNames,Sheets)

