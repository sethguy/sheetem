const { setDefaultQuestion,buildParagraphQuestions } = require("./questionBuilders");

const buildQuestionData = (props) => {
    const { colName, v, row, sheetName, questions,colIndex } = props;

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
