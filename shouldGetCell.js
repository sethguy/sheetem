const { defaultCellCheck } = require("./cellChecks");
const shouldGetCell = ({ sheetName, sheet, colName, count }) => {
    const goodCell = defaultCellCheck({ sheet, colName, count });
    return goodCell;
};
module.exports = {
    shouldGetCell
};
