const defaultColCheck = ({ sheet, sheetName, colIndex, colName, row  }) => sheet[`${colName}${row}`] && sheet[`${colName}${row}`].v;

module.exports = {
    defaultColCheck,
}