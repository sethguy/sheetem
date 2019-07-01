const { defaultColCheck } = require('./colChecks')

const shouldGetCol = (props) => {

    const { sheet, colName, sheetName, colIndex } = props;

    const goodCol = defaultColCheck({ sheet, colName })

    return goodCol
}

module.exports = {
    shouldGetCol,
}