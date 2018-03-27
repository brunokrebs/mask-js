import * as chai from 'chai';
import {maskCurrency, showWithCents} from '../src';

describe('maskCurrency', () => {
  it('should be able to mask as money', maskAsMoney);
  it('should be able to mask numbers', maskNumbers);
  it('should be able to ignore non-digits', ignoreNonDigits);
  it('should be able to accept comma as decimal separator', changeDecimalSeparator);
  it('should be able to always show cents when asked', showCents);
});

function maskAsMoney() {
  chai.expect(maskCurrency('1')).to.equal('1');
  chai.expect(maskCurrency('12')).to.equal('12');
  chai.expect(maskCurrency('123')).to.equal('1.23');
  chai.expect(maskCurrency('1234')).to.equal('12.34');
  chai.expect(maskCurrency('12345')).to.equal('123.45');
  chai.expect(maskCurrency('123456')).to.equal('1,234.56');
  chai.expect(maskCurrency('123456789')).to.equal('1,234,567.89');
  chai.expect(maskCurrency('12345678901234')).to.equal('123,456,789,012.34');
}

function maskNumbers() {
  chai.expect(maskCurrency(null)).to.equal('');
  chai.expect(maskCurrency(1)).to.equal('1');
  chai.expect(maskCurrency(12)).to.equal('12');
  chai.expect(maskCurrency(2.5)).to.equal('2.5');
  chai.expect(maskCurrency(2.50)).to.equal('2.5');
  chai.expect(maskCurrency(2.51)).to.equal('2.51');
  chai.expect(maskCurrency(2.01)).to.equal('2.01');
  chai.expect(maskCurrency(222.5)).to.equal('222.5');
  chai.expect(maskCurrency(123)).to.equal('1.23');
  chai.expect(maskCurrency(1234)).to.equal('12.34');
  chai.expect(maskCurrency(12345)).to.equal('123.45');
  chai.expect(maskCurrency(123456)).to.equal('1,234.56');
  chai.expect(maskCurrency(123456789)).to.equal('1,234,567.89');
  chai.expect(maskCurrency(12345678901234)).to.equal('123,456,789,012.34');
}

function ignoreNonDigits() {
  chai.expect(maskCurrency('a')).to.equal('');
  chai.expect(maskCurrency(null)).to.equal('');
  chai.expect(maskCurrency(undefined)).to.equal('');
  chai.expect(maskCurrency('')).to.equal('');
  chai.expect(maskCurrency('a1')).to.equal('1');
  chai.expect(maskCurrency('12a145b6nm7')).to.equal('12,145.67');
}

function changeDecimalSeparator() {
  chai.expect(maskCurrency('12a145b6nm7', ',')).to.equal('12.145,67');
  chai.expect(maskCurrency('123456789', ',')).to.equal('1.234.567,89');
}

function showCents() {
  chai.expect(showWithCents(null)).to.equal('0.00');
  chai.expect(showWithCents(0)).to.equal('0.00');
  chai.expect(showWithCents('0')).to.equal('0.00');
  chai.expect(showWithCents(0.00)).to.equal('0.00');
  chai.expect(showWithCents('0.00')).to.equal('0.00');
  chai.expect(showWithCents('12a145b6nm7')).to.equal('12.00');
  chai.expect(showWithCents(1234)).to.equal('1,234.00');
  chai.expect(showWithCents('151234')).to.equal('151,234.00');
  chai.expect(showWithCents(151234)).to.equal('151,234.00');
  chai.expect(showWithCents('151234.35')).to.equal('151,234.35');
  chai.expect(showWithCents(151234.35)).to.equal('151,234.35');
}
