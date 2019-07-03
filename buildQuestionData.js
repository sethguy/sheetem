const { setDefaultQuestion,buildParagraphQuestions,buildComprehensionQuestion } = require("./questionBuilders");

const buildQuestionData = (props) => {
    const { colName, v, row, sheetName, questions,colIndex } = props;

    if (sheetName.indexOf('Comprehension') > -1) {
        const question = buildComprehensionQuestion({ colName, v, row, sheetName, questions,colIndex });
        return question;
    }

    if (sheetName.indexOf('Para') > -1) {
        const question = buildParagraphQuestions({ colName, v, row, sheetName, questions,colIndex });
        return question;
    }

    const question = setDefaultQuestion({ colName, v, row, sheetName, questions });
    return { ...question };
};
module.exports = {
    buildQuestionData,
};
