const {
    dailyMath,
    funcWord,
    dailyMathLine,
    budge,
    billCoin,
    change,
    sequencing,
    basicPlus,
    semFea,
    genName,
    buildRecallQuestions,
    buildParagraphRecallQuestions,
    namesFaces,
    setDefaultQuestion,
    buildParagraphQuestions,
    buildComprehensionQuestion,
    buildOblab,
    buildYesNo,
    adjectivesNVerbs,
    followingDirections,
    objectNameQuestions
} = require("./questionBuilders");

const buildQuestionData = (props) => {
    const { colName, v, row, sheetName, questions, colIndex, sheet, cell } = props;


    if (sheetName.indexOf('Correct change') > -1) {
        const question = change({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }
    if (sheetName.indexOf('Bill Coin Total') > -1) {
        const question = billCoin({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }
    if (sheetName.indexOf('Budgeting') > -1) {
        const question = budge({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }
    if (sheetName === 'Daily Math') {
        const question = dailyMath({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }

    if (sheetName.indexOf('Daily Math line') > -1) {
        const question = dailyMathLine({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }
    if (sheetName.indexOf('Functional Word Problems') > -1) {
        const question = funcWord({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }






    if (sheetName.indexOf('Sequencing') > -1) {
        const question = sequencing({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }

    if (sheetName.indexOf('Community Signs & Symbols') > -1) {
        const question = basicPlus({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }

    if (sheetName.indexOf('Functional Reading') > -1) {
        const question = buildRecallQuestions({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }

    if (sheetName.indexOf('Object Naming') > -1) {
        const question = objectNameQuestions({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }

    if (sheetName.indexOf('Following Directions') > -1) {
        const question = followingDirections({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }

    if (sheetName.indexOf('Verbs') > -1 || sheetName.indexOf('Adjectives') > -1 || sheetName.indexOf('Categories 1') > -1) {
        const question = adjectivesNVerbs({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }

    if (sheetName.indexOf('Yes and No') > -1) {
        const question = buildYesNo({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }

    if (sheetName.indexOf('Object Labeling') > -1) {
        const question = buildOblab({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }

    if (sheetName.indexOf('Comprehension') > -1) {
        const question = buildComprehensionQuestion({ colName, v, row, sheetName, questions, cell, colIndex });
        return question;
    }

    if (sheetName.indexOf('Paragraph Recall') > -1) {
        const question = buildParagraphRecallQuestions({ colName, v, row, sheetName, questions, cell, colIndex, sheet });
        return question;
    }

    if (sheetName.indexOf('Para') > -1) {
        const question = buildParagraphQuestions({ colName, v, row, sheetName, questions, cell, colIndex, sheet });
        return question;
    }

    if (sheetName.indexOf('Picture Recall') > -1 || sheetName.indexOf('Voicemail Recall') > -1) {
        const question = buildRecallQuestions({ colName, v, row, sheetName, questions, cell, colIndex, sheet });
        return question;
    }

    if (sheetName.indexOf('Names') > -1) {
        const question = namesFaces({ colName, v, row, sheetName, questions, cell, colIndex, sheet });
        return question;
    }

    if (sheetName.indexOf('Object Recall') > -1 || sheetName.indexOf('Naming Semantic Feature Chart') > -1 || sheetName.indexOf('Picture Description') > -1) {
        const question = semFea({ colName, v, row, sheetName, questions, cell, colIndex, sheet });
        return question;
    }

    if (sheetName.indexOf('Generative Naming') > -1 || sheetName.indexOf('Conversation Starter') > -1) {
        const question = genName({ colName, v, row, sheetName, questions, cell, colIndex, sheet });
        return question;
    }

    const question = setDefaultQuestion({ colName, v, row, sheetName, questions, cell });
    return { ...question };
};

module.exports = {
    buildQuestionData,
};
