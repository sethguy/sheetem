if (typeof require !== 'undefined') XLSX = require('xlsx');
var workbook = XLSX.readFile('Expressive Language Final.xlsx');

const { SheetNames, Sheets } = workbook;

console.log(Object.keys(Sheets))

const cols = ["A", "B", "C", "D", "E"]

const defaultCellCheck = ({ sheet, colName, count }) => sheet[`${colName}${count}`] && sheet[`${colName}${count}`].v.length;

const shouldGetCell = ({ sheetName, sheet, colName, count }) => {

    
    const goodCell = defaultCellCheck({ sheet, colName, count })

    return goodCell;
}


const setDefaultQuestion = (props) => {
    const { colName, v, count, sheetName, questions } = props;

    const question = questions[count - 1] || { tags: [sheetName], wrongAnswerText: [] }

    if (colName == 'A') {
        question.challange = v;
    }
    if (colName == 'B') {
        question.answerText = v;
    }
    if (colName == 'C') {
        question.wrongAnswerText.push(v)
    }
    if (colName == 'D') {
        question.wrongAnswerText.push(v)
    }

    if (!question[count - 1]) {
        questions.push(question)
    }

    return { ...question }

}

const buildQuestionData = (props) => {

    const { colName, v, count, sheetName, questions } = props;

    const question = setDefaultQuestion({ colName, v, count, sheetName, questions })

    return { ...question }
}

SheetNames.map(sheetName => {

    const sheet = Sheets[sheetName]

    const questions = [];
    const realCols = cols
        .filter((colName) => sheet[`${colName}1`] && sheet[`${colName}1`].v)

        .map((colName, colIndex) => {
            let count = 1;
            while (shouldGetCell({ sheet, sheetName, colName, count })) {
                const v = sheet[`${colName}${count}`].v
                const question = buildQuestionData({ v, colName, sheetName, count, questions })
                count++;
            }
            console.log(colName, "TCL: count", questions)
            return
        })

    return Sheets[sheetName]
})