const defaultCellCheck = ({ sheet, colName, count }) => sheet[`${colName}${count}`] && sheet[`${colName}${count}`].v.length;
 module.exports={
    defaultCellCheck
 };
