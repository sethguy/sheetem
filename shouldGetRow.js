const { defaultRowCheck, paragraphRowCheck } = require("./rowChecks");
const shouldGetRow = ({ sheetName, sheet, row }) => {

    if (sheetName.indexOf('Para') > -1 ||
        sheetName.indexOf('Picture Recall') > -1 ||
        sheetName.indexOf('Voicemail Recall') > -1 ||
        sheetName.indexOf('Paragraph Recall') > -1 ||
        sheetName.indexOf('Functional Reading') > -1
    ) {
        const goodRow = paragraphRowCheck({ sheet, sheetName, row });
        return goodRow;
    }

    const goodRow = defaultRowCheck({ sheet, row });
    return goodRow;
};
module.exports = {
    shouldGetRow
};
