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
};

module.exports = {
    setDefaultQuestion,
}