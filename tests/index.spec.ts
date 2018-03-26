import * as chai from 'chai';
import {maskJs, maskCurrency} from '../src/index';

describe('maskJs', () => {
  it('should be able to import maskJs', function () {
    chai.expect(maskJs).to.be.not.null;
    chai.expect(maskJs).to.be.not.undefined;
  });

  it('should be a function', function () {
    // testing if .bind exists anywhere else
    const emptyObject: any = {};
    const hello: any = 'hello';
    chai.assert.isUndefined(emptyObject.bind);
    chai.assert.isUndefined(hello.bind);

    // now in our function
    chai.assert.isDefined(maskJs.bind);
  });

  it('should be able to handle empty masks', () => {
    chai.expect(maskJs('99', '1')).to.equal('1');
    chai.expect(maskJs('99', '22')).to.equal('22');
    chai.expect(maskJs('99', '333')).to.equal('33');
    chai.expect(maskJs('99', '4444')).to.equal('44');
  });

  it('should be able to apply simple masks', function () {
    chai.expect(maskJs('(99) 99', '0123456')).to.equal('(01) 23');
    chai.expect(maskJs('(99)', '88')).to.equal('(88');
    chai.expect(maskJs('(99)', '77')).to.equal('(77');
    chai.expect(maskJs('-99-', '77')).to.equal('-77');
  });

  it('should be able to apply more complex masks', function () {
    chai.expect(maskJs('(99) 9999', '777777')).to.equal('(77) 7777');
    chai.expect(maskJs('(99) 9999?9-9999', '12345678')).to.equal('(12) 3456-78');
    chai.expect(maskJs('(99) 9999?9-9999', '1234567')).to.equal('(12) 3456-7');
    chai.expect(maskJs('(9)9?9-9', '(0)12-3')).to.equal('(0)12-3');
    chai.expect(maskJs('(99) 9999?9-9999', '(12) 3456-78')).to.equal('(12) 3456-78');

    chai.expect(maskJs('(99) 9999-9999', '1234567890')).to.equal('(12) 3456-7890');
    chai.expect(maskJs('(99) 99999-9999', '12345678901')).to.equal('(12) 34567-8901');
  });

  it('should be able to handle optional chars', function () {
    chai.expect(maskJs('?999', '12')).to.equal('12');
    chai.expect(maskJs('?999', '12345')).to.equal('123');

    chai.expect(maskJs('(99) 9999?9-9999', '1234567890')).to.equal('(12) 3456-7890');
    chai.expect(maskJs('(99) 9?9999-9999', '1234567890')).to.equal('(12) 3456-7890');
    chai.expect(maskJs('(99) 9999?9-9999', '12345678901')).to.equal('(12) 34567-8901');
    chai.expect(maskJs('(99) 9999?9-99999', '123456789012')).to.equal('(12) 34567-89012');

    chai.expect(maskJs('(99) 9999-999?9', '001234567')).to.equal('(00) 1234-567');
    chai.expect(maskJs('(99) 9999-999?9', '0012345678')).to.equal('(00) 1234-5678');
    chai.expect(maskJs('(99) 9999-9999?9', '001234567890')).to.equal('(00) 1234-56789');
  });

  it('should be able to multiple optional chars', function () {
    chai.expect(maskJs('(99) ?999?99-9999?9', '001234567890')).to.equal('(00) 12345-67890');
    chai.expect(maskJs('(99) ?999?99-9999?9', '00123456789')).to.equal('(00) 1234-56789');
    chai.expect(maskJs('(99) 9?99?99-99?999', '0012345678')).to.equal('(00) 123-45678');
  });

  it('should ignore non digits', function () {
    chai.expect(maskJs('(99)9?99?99-99?999', '0A12345678')).to.equal('(01)234-5678');
    chai.expect(maskJs('(99)9?99?99-99?999', 'AAA')).to.equal('');
    chai.expect(maskJs('(99)9?99?99-99?999', 'AA1A')).to.equal('(1');
  });
});

describe('maskCurrency', () => {
  it('should be able to mask as money', function () {
    chai.expect(maskCurrency('1')).to.equal('1');
    chai.expect(maskCurrency('12')).to.equal('12');
    chai.expect(maskCurrency('123')).to.equal('1.23');
    chai.expect(maskCurrency('1234')).to.equal('12.34');
    chai.expect(maskCurrency('12345')).to.equal('123.45');
    chai.expect(maskCurrency('123456')).to.equal('1,234.56');
    chai.expect(maskCurrency('123456789')).to.equal('1,234,567.89');
    chai.expect(maskCurrency('12345678901234')).to.equal('123,456,789,012.34');
  });

  it('should be able to mask numbers', function () {
    chai.expect(maskCurrency(null)).to.equal('');
    chai.expect(maskCurrency(1)).to.equal('1');
    chai.expect(maskCurrency(12)).to.equal('12');
    chai.expect(maskCurrency(123)).to.equal('1.23');
    chai.expect(maskCurrency(1234)).to.equal('12.34');
    chai.expect(maskCurrency(12345)).to.equal('123.45');
    chai.expect(maskCurrency(123456)).to.equal('1,234.56');
    chai.expect(maskCurrency(123456789)).to.equal('1,234,567.89');
    chai.expect(maskCurrency(12345678901234)).to.equal('123,456,789,012.34');
  });

  it('should be able to ignore non numbers', function () {
    chai.expect(maskCurrency('a')).to.equal('');
    chai.expect(maskCurrency(null)).to.equal('');
    chai.expect(maskCurrency(undefined)).to.equal('');
    chai.expect(maskCurrency('')).to.equal('');
    chai.expect(maskCurrency('a1')).to.equal('1');
    chai.expect(maskCurrency('12a145b6nm7')).to.equal('12,145.67');
  });

  it('should be able to accept comma as decimal separator', function () {
    chai.expect(maskCurrency('12a145b6nm7', ',')).to.equal('12.145,67');
    chai.expect(maskCurrency('123456789', ',')).to.equal('1.234.567,89');
  });
});
