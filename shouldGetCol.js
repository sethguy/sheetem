const { defaultColCheck,paragraphColCheck } = require('./colChecks')

const shouldGetCol = (props) => {

    const { sheet, sheetName, colIndex, colName, row } = props;

    if (sheetName.indexOf('Para') > -1||sheetName.indexOf('Picture Recall') > -1 ||sheetName.indexOf('Voicemail Recall') > -1 ||sheetName.indexOf('Paragraph Recall') > -1) {
        const goodCol = paragraphColCheck({sheet, sheetName, colIndex, colName, row });
        return goodCol;
    }

    const goodCol = defaultColCheck({ sheet, sheetName, colIndex, colName, row  })

    return goodCol
}

module.exports = {
    shouldGetCol,
}