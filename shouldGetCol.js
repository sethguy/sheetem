const { defaultColCheck,paragraphColCheck } = require('./colChecks')

const shouldGetCol = (props) => {

    const { sheet, sheetName, colIndex, colName, row } = props;

    if (sheetName.indexOf('Para') > -1) {
        const goodCol = paragraphColCheck({sheet, sheetName, colIndex, colName, row });
        return goodCol;
    }

    const goodCol = defaultColCheck({ sheet, sheetName, colIndex, colName, row  })

    return goodCol
}

module.exports = {
    shouldGetCol,
}