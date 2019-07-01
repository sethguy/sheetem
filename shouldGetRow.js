const { defaultRowCheck, paragraphRowCheck } = require("./rowChecks");
const shouldGetRow = ({ sheetName, sheet, row }) => {

    if (sheetName.indexOf('Para') > -1) {
        const goodRow = paragraphRowCheck({ sheet, sheetName, row });
        return goodRow;
    }

    const goodRow = defaultRowCheck({ sheet, row });
    return goodRow;
};
module.exports = {
    shouldGetRow
};
