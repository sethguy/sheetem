const { setDefaultQuestion,buildParagraphQuestions,buildComprehensionQuestion,buildOblab,buildYesNo,adjectivesNVerbs,followingDirections } = require("./questionBuilders");

const buildQuestionData = (props) => {
    const { colName, v, row, sheetName, questions,colIndex } = props;
    console.log("TCL: buildQuestionData -> sheetName", sheetName)

    if (sheetName.indexOf('Following Directions') > -1) {
        const question = followingDirections({ colName, v, row, sheetName, questions,colIndex });
        return question;
    }

    if (sheetName.indexOf('Verbs') > -1 || sheetName.indexOf('Adjectives') > -1) {
        const question = adjectivesNVerbs({ colName, v, row, sheetName, questions,colIndex });
        return question;
    }

    if (sheetName.indexOf('Yes and No') > -1) {
        const question = buildYesNo({ colName, v, row, sheetName, questions,colIndex });
        return question;
    }

    if (sheetName.indexOf('Object Labeling') > -1) {
        const question = buildOblab({ colName, v, row, sheetName, questions,colIndex });
        return question;
    }

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
