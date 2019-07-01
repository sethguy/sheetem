const setDefaultQuestion = (props) => {
    const { colName, v, row, sheetName, questions, colIndex } = props;
    if (colName == 'A') {
        const question = { moduleName: sheetName, wrongAnswerText: [] }
        question.challange = v;
        questions.push(question)
    }
    if (colName == 'B') {
        const question = questions[row - 1]
        question.answerText = v;
    }
    if (colName == 'C') {
        const question = questions[row - 1]
        question.wrongAnswerText.push(v)
    }
    if (colName == 'D') {
        const question = questions[row - 1]
        question.wrongAnswerText.push(v)
    }
};

const buildParagraphQuestions = (props) => {
    const { colName, v, row, sheetName, questions, colIndex } = props;
    if (colIndex == 0 && v && v.length) {
        const question = { questionSet: [], moduleName: sheetName }
        question.statement = v;
        questions.push(question);
    } else if (v && v.length) {
        const question = questions[questions.length - 1]
        const { questionSet } = question;
        if (colIndex == 1) {
            questionSet.push({ challange: v, wrongAnswerText: [] })
        }
        if (colIndex == 2) {
            const currentChallange = questionSet[questionSet.length - 1]
            currentChallange.answerText = v
        }
        if (colIndex > 2) {
            const currentChallange = questionSet[questionSet.length - 1]
            currentChallange.wrongAnswerText.push(v)
        }
    }
}

module.exports = {
    setDefaultQuestion,
    buildParagraphQuestions,
}