const isNumber = (value) => {
  return !isNaN(value);
};

const removeNonDigits = (value): string => {
  return value.toString().replace(/\D/g,'');
};

export {
  isNumber, removeNonDigits,
};
