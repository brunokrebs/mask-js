import * as chai from 'chai';
import maskCurrency from '../src/currency';

describe('maskCurrency', () => {
  it('should be able to mask as money', maskStringAsCurrency);
  it('should be able to mask numbers', maskNumberAsCurrency);
  it('should be able to ignore non-digits', ignoreNonDigits);
  it('should be able to accept comma as decimal separator', changeDecimalSeparator);
});

function maskStringAsCurrency() {
  chai.expect(maskCurrency('')).to.equal('0.00');
  chai.expect(maskCurrency(' ')).to.equal('0.00');
  chai.expect(maskCurrency('  ')).to.equal('0.00');
  chai.expect(maskCurrency('0')).to.equal('0.00');
  chai.expect(maskCurrency('1')).to.equal('1.00');
  chai.expect(maskCurrency('12')).to.equal('12.00');
  chai.expect(maskCurrency('123')).to.equal('123.00');
  chai.expect(maskCurrency('1234')).to.equal('1,234.00');
  chai.expect(maskCurrency('12345')).to.equal('12,345.00');
  chai.expect(maskCurrency('123456')).to.equal('123,456.00');
  chai.expect(maskCurrency('1234567.89')).to.equal('1,234,567.89');
  chai.expect(maskCurrency('123456789012.34')).to.equal('123,456,789,012.34');
  chai.expect(maskCurrency('12345678901234')).to.equal('12,345,678,901,234.00');
}

function maskNumberAsCurrency() {
  chai.expect(maskCurrency(null)).to.equal('0.00');
  chai.expect(maskCurrency(0)).to.equal('0.00');
  chai.expect(maskCurrency(1)).to.equal('1.00');
  chai.expect(maskCurrency(12)).to.equal('12.00');
  chai.expect(maskCurrency(2.5)).to.equal('2.50');
  chai.expect(maskCurrency(2.50)).to.equal('2.50');
  chai.expect(maskCurrency(2.51)).to.equal('2.51');
  chai.expect(maskCurrency(2.01)).to.equal('2.01');
  chai.expect(maskCurrency(222.5)).to.equal('222.50');
  chai.expect(maskCurrency(123)).to.equal('123.00');
  chai.expect(maskCurrency(1234)).to.equal('1,234.00');
  chai.expect(maskCurrency(12345)).to.equal('12,345.00');
  chai.expect(maskCurrency(1234.56)).to.equal('1,234.56');
  chai.expect(maskCurrency(1234567.89)).to.equal('1,234,567.89');
  chai.expect(maskCurrency(123456789012.34)).to.equal('123,456,789,012.34');
}

function ignoreNonDigits() {
  chai.expect(maskCurrency('a')).to.equal('0.00');
  chai.expect(maskCurrency(null)).to.equal('0.00');
  chai.expect(maskCurrency(undefined)).to.equal('0.00');
  chai.expect(maskCurrency('')).to.equal('0.00');
  chai.expect(maskCurrency('a1')).to.equal('0.00');
  chai.expect(maskCurrency('12a145b6nm7')).to.equal('0.00');
}

function changeDecimalSeparator() {
  chai.expect(maskCurrency('12a145b6nm7', ',')).to.equal('0,00');
  chai.expect(maskCurrency('123456789', ',')).to.equal('123.456.789,00');
  chai.expect(maskCurrency('123456789.01', ',')).to.equal('123.456.789,01');
}
