export default maskJs;

const DIGIT = '9';
const OPTIONAL = '?';

function maskJs(mask: string, value: string): string {
  const inputArray = value.split('') || [];
  const digitsEntered = inputArray
    .map((char, index) => (isNumber(char) ? 1 : 0))
    .reduce((prev, next) => (prev + next), 0);
  if (digitsEntered == 0) return '';

  const inputLength = value.length;
  const maskArray = mask.split('') || [];
  const indexes = maskArray.map((char, index) => (char === OPTIONAL ? index : '')).filter(String);

  // counts 9s in the mask
  const digitPlaces = maskArray
    .map((char, index) => (char === DIGIT ? 1 : 0))
    .reduce((prev, next) => (prev + next), 0);

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
    if (char === DIGIT && inputLength > nextElement) {
      const isNum = isNumber(value[nextElement]);
      if (isNum) {
        maskedValue[index] = value[nextElement];
        nextElement++;
        return;
      }
      while (inputLength > nextElement && !isNumber(value[nextElement])) {
        nextElement++;
      }
      maskedValue[index] = isNumber(value[nextElement]) ? value[nextElement] : '';
      nextElement++;
    } else if (inputLength <= nextElement) {
      maskedValue[index] = '';
    }
  });
  return maskedValue.join("");
} // preceeded by optional

function isNumber(value) {
  return value && value.match(/[0-9]/) != null;
}
