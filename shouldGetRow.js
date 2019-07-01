const { defaultRowCheck } = require("./rowChecks");
const shouldGetRow = ({ sheetName, sheet, row }) => {
    const goodRow = defaultRowCheck({ sheet, row });
    return goodRow;
};
module.exports = {
    shouldGetRow
};
