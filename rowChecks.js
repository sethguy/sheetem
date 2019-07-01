const defaultRowCheck = ({ sheet, row }) => sheet[`A${row}`] && sheet[`A${row}`].v.length;
 module.exports={
    defaultRowCheck
 };
