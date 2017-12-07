export default jsMasker;

const DIGIT = '9';
const ALPHA = 'A';
const ALPHANUM = 'S';

function jsMasker(mask: string, value: string): string {
    const availableSpaces = mask.replace(/\W/g, '');
    const completeInput = availableSpaces.length === value.length;
    const maskArray = mask.split('');
    const maskedValue = maskArray;
    let nextElement = 0;
    maskArray.map((char, index) => {
        if (char === DIGIT && value[nextElement].match(/[0-9]/)) {
            maskedValue[index] = value[nextElement];
            nextElement++;
        }
    });
    return maskedValue.join("");
}