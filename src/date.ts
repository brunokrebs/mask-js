const maskDate = (value: Date, format = 'en-US'): string => {
  if (format === 'en-US') {
    return `${value.getFullYear()}/${value.getMonth() + 1}/${value.getDate()}`;
  }
  return `${value.getDate()}/${value.getMonth() + 1}/${value.getFullYear()}`;
};

export default maskDate;
