const defaultRowCheck = ({ sheet, row }) => sheet[`A${row}`] && sheet[`A${row}`].v.length;

const paragraphRowCheck = ({sheetName, sheet, row }) =>{

   const aHasText = sheet[`A${row}`] && sheet[`A${row}`].v.length;
   const bHasText = sheet[`B${row}`] && sheet[`B${row}`].v.length;
   const cHasText = sheet[`C${row}`] && sheet[`C${row}`].v.length;

   return aHasText || bHasText || cHasText
}

 module.exports={
    defaultRowCheck,
    paragraphRowCheck,
 };
