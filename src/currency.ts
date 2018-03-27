import {isNumber, removeNonDigits} from './util';

const toFixed = (value: string | number): string => {
  if (isNumber(value)) return Number(value).toFixed(2);
  return Number(0).toFixed(2);
};

const maskCurrency = (value: string | number, decimalSeparator = '.'): string => {
  const thousandsSeparator = decimalSeparator == '.' ? ',' : '.';
  const withDecimal = toFixed(value);
  const justDigits = removeNonDigits(withDecimal);

  const reversedArray = justDigits.split('').reverse();
  let result = '';
  reversedArray.map((char, index) => {
    if (index == 2) {
      result = decimalSeparator + result;
    } else if (index >= 5 && (index + 1) % 3 === 0) {
      result = thousandsSeparator + result;
    }
    result = char + result;
  });
  return result;
};

export default maskCurrency;
