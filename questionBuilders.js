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

const followingDirections = (props) => {
    const { colName, v, row, sheetName, questions, colIndex } = props;
    if (colIndex == 0) {
        const question = { moduleName: sheetName, wrongAnswerText: [] };
        question.text = v;
        questions.push(question);
    }
    if (colIndex == 1) {
        const question = questions[row - 1];
        question.audio = v;
    }
    if (colIndex == 2) {
        const question = questions[row - 1]
        question.appliance = v;
    }
};

const adjectivesNVerbs = (props) => {
    const { colName, v, row, sheetName, questions, colIndex } = props;
    if (colIndex == 0) {
        const question = { moduleName: sheetName, wrongAnswerText: [] };
        question.challangeText = v;
        questions.push(question);
    }
    if (colIndex == 1) {
        const question = questions[row - 1];
        question.challangePicture = v;
    }
    if (colIndex == 2) {
        const question = questions[row - 1]
        question.answerText = v;
    }
    if (colIndex > 2) {
        const question = questions[row - 1];
        question.wrongAnswerText.push(v);
    }
};

const buildYesNo = (props) => {
    const { colName, v, row, sheetName, questions, colIndex } = props;
    if (colIndex == 0) {
        const question = { moduleName: sheetName }

        if (sheetName.indexOf('1') > -1) {

            question.challangePicture = v;

        } else {
            question.challangeAudio = v;


        }
        questions.push(question)
    }
    if (colIndex == 1) {
        const question = questions[row - 1]
        question.challangeText = v;
    }
    if (colIndex == 2) {
        const question = questions[row - 1]
        question.answerText = v;
    }
};


const buildOblab = (props) => {
    const { colName, v, row, sheetName, questions, colIndex } = props;
    if (colIndex == 0) {
        const question = { moduleName: sheetName, wrongPictures: [], rightPicture: [] }
        question.challangeAudio = v;
        questions.push(question)
    }
    if (colIndex == 1) {
        const question = questions[row - 1]
        question.answerText = v;
    }
    if (colIndex == 2) {
        const question = questions[row - 1]
        question.rightPicture.push(v)
    }
    if (colIndex > 2) {
        const question = questions[row - 1]
        question.wrongPictures.push(v)
    }
};


const buildComprehensionQuestion = (props) => {
    const { colName, v, row, sheetName, questions, colIndex } = props;
    if (colIndex == 0) {
        const question = { moduleName: sheetName, wrongAnswerText: [] }
        question.statement = v;
        questions.push(question)
    }
    if (colIndex == 1) {
        const question = questions[row - 1]
        question.statementAudio = v;
    }
    if (colIndex == 2) {
        const question = questions[row - 1]
        question.challangeText = v;
    }
    if (colIndex === 3) {
        const question = questions[row - 1]
        question.answerText = v;
    }
    if (colIndex > 3) {
        const question = questions[row - 1]
        question.wrongAnswerText.push(v);
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
    buildComprehensionQuestion,
    buildOblab,
    buildYesNo,
    adjectivesNVerbs,
    followingDirections,
}