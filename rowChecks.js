const defaultRowCheck = ({ sheet, row }) => sheet[`A${row}`] && sheet[`A${row}`].v.length;

const paragraphRowCheck = ({sheetName, sheet, row }) =>{

   const aHasText = sheet[`A${row}`] && sheet[`A${row}`].v.length;
   const bHasText = sheet[`B${row}`] && sheet[`B${row}`].v.length;

   return aHasText || bHasText
}

 module.exports={
    defaultRowCheck,
    paragraphRowCheck,
 };
