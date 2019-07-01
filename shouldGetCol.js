const { defaultColCheck } = require('./colChecks')

const shouldGetCol = (props) => {

    const { sheet, sheetName, colIndex, colName, row } = props;

    const goodCol = defaultColCheck({ sheet, sheetName, colIndex, colName, row  })

    return goodCol
}

module.exports = {
    shouldGetCol,
}