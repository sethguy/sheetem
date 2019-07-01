const defaultColCheck = ({ colName, sheet }) => sheet[`${colName}1`] && sheet[`${colName}1`].v;

module.exports = {
    defaultColCheck,
}