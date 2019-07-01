const { setDefaultQuestion } = require("./questionBuilders");

const buildQuestionData = (props) => {
    const { colName, v, count, sheetName, questions } = props;
    const question = setDefaultQuestion({ colName, v, count, sheetName, questions });
    return { ...question };
};
module.exports = {
    buildQuestionData,
};
