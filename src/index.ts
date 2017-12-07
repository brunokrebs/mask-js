export default jsMasker;

const DIGIT = '9';
const ALPHA = 'A';
const ALPHANUM = 'S';

function jsMasker(mask: string, value: string): string {
    const availableSpaces = mask.replace(/\W/g, '');
    const completeInput = availableSpaces.length === value.length;
    mask.split('').map(char => {
       console.log(char);
    });
    return value;
}