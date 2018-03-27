export {
  maskCurrency, maskJs, showWithCents,
};

const DIGIT = '9';
const OPTIONAL = '?';

const isFloat = (value) => (Number(value) === value && value % 1 !== 0);

const decimalPlaces = (value) => ((value.toString().split('.')[1] || []).length);

function maskCurrency(value: string | number, decimalSeparator = '.', twoDecimalPlaces = false): string {
  const thousandsSeparator = decimalSeparator == '.' ? ',' : '.';
  value = value || '';
  let justNumbers = value.toString().replace(/\D/g,'');

  if (isFloat(value)) {
    justNumbers = (Number(value)
      .toFixed(2))
      .toString()
      .replace(/\D/g,'');
  }

  const reversedArray = justNumbers.split('').reverse();
  let result = '';
  reversedArray.map((char, index) => {
    if (index == 2) {
      result = decimalSeparator + result;
    } else if (index >= 5 && (index + 1) % 3 === 0) {
      result = thousandsSeparator + result;
    }
    result = char + result;
  });

  if (!twoDecimalPlaces && decimalPlaces(result) === 2 && result.substring(result.length - 1, result.length) === '0') {
    return result.substring(0, result.length - 1)
  }

  return result;
}

function maskJs(mask: string, value: string): string {
  value = (value || '');
  const justNumbers = value.replace(/\D/g,'');
  const inputArray = justNumbers.split('');
  const digitsEntered = inputArray
    .map((char, index) => (isNumber(char) ? 1 : 0))
    .reduce((prev, next) => (prev + next), 0);
  if (digitsEntered == 0) return '';

  const inputLength = justNumbers.length;
  mask = mask || '';
  const maskArray = mask.split('');
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
      const isNum = isNumber(justNumbers[nextElement]);
      if (isNum) {
        maskedValue[index] = justNumbers[nextElement];
        nextElement++;
        return;
      }
      while (inputLength > nextElement && !isNumber(justNumbers[nextElement])) {
        nextElement++;
      }
      maskedValue[index] = isNumber(justNumbers[nextElement]) ? justNumbers[nextElement] : '';
      nextElement++;
    } else if (inputLength <= nextElement) {
      maskedValue[index] = '';
    }
  });
  return maskedValue.join("");
} // preceeded by optional

function isNumber(value) {
  return value && value.toString().match(/[0-9]/) != null;
}

function showWithCents(value: number | string): string {
  if (!value || !isNumber(value)) {
    return Number(0).toFixed(2).toString();
  }
  return maskCurrency(parseFloat(value.toString()).toFixed(2).toString(), '.', true);
}
