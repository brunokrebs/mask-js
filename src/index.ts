export default jsMasker;

const DIGIT = '9';
const OPTIONAL = '?';

function jsMasker(mask: string, value: string): string {
    const inputLength = value.length;
    const maskArray = mask.split('') || [];
    const indexes = maskArray.map((char, index) => (char === OPTIONAL ? index : '')).filter(String);

    // counts 9s in the mask
    const digitPlaces = maskArray
        .map((char, index) => (char === DIGIT ? 1 : 0))
        .reduce((prev, next) => (prev + next), 0);
    const maskLength = maskArray.length - indexes.length;
    const maskedValue = maskArray;

    let nextElement = 0;
    let jump = false;
    let lengthDiff = digitPlaces - inputLength;
    maskArray.map((char, index) => {
        if (jump) {
            lengthDiff--;
            jump = false;
            maskedValue[index] = '';
            return;
        }
        if (char === OPTIONAL) {
            jump = lengthDiff > 0;
            maskedValue[index] = '';
            return;
        }
        if (char === DIGIT && inputLength > nextElement && isNumber(value[nextElement])) {
            maskedValue[index] = value[nextElement];
            nextElement++;
        } else if (inputLength <= nextElement) {
            maskedValue[index] = '';
        }
    });
    return maskedValue.join("");
} // preceeded by optional

function isNumber(value) {
    return value.match(/[0-9]/);
}