const defaultColCheck = ({ sheet, sheetName, colIndex, colName, row  }) => sheet[`${colName}${row}`] && sheet[`${colName}${row}`].v;

const paragraphColCheck = ({ sheet, sheetName, colIndex, colName, row  }) => {
    return colIndex <6
}

module.exports = {
    defaultColCheck,
    paragraphColCheck,
}