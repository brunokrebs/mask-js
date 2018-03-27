import * as chai from 'chai';
import {maskJs} from '../src';

describe('maskJs', () => {
  it('should be able to import maskJs', importMaskJs);
  it('should be a function', checkFunction);
  it('should be able to handle empty masks', handleEmpty);
  it('should be able to apply simple masks', simpleMasks);
  it('should be able to apply more complex masks', complexMasks);
  it('should be able to handle optional chars', optionalChars);
  it('should be able to multiple optional chars', multipleOptional);
  it('should ignore non digits', ignoreNonDigits);
});

function importMaskJs () {
  chai.expect(maskJs).to.be.not.null;
  chai.expect(maskJs).to.be.not.undefined;
}

function checkFunction () {
  // testing if .bind exists anywhere else
  const emptyObject: any = {};
  const hello: any = 'hello';
  chai.assert.isUndefined(emptyObject.bind);
  chai.assert.isUndefined(hello.bind);

  // now in our function
  chai.assert.isDefined(maskJs.bind);
}

function handleEmpty() {
  chai.expect(maskJs('99', '1')).to.equal('1');
  chai.expect(maskJs('99', '22')).to.equal('22');
  chai.expect(maskJs('99', '333')).to.equal('33');
  chai.expect(maskJs('99', '4444')).to.equal('44');
}

function simpleMasks () {
  chai.expect(maskJs('(99) 99', '0123456')).to.equal('(01) 23');
  chai.expect(maskJs('(99)', '88')).to.equal('(88');
  chai.expect(maskJs('(99)', '77')).to.equal('(77');
  chai.expect(maskJs('-99-', '77')).to.equal('-77');
}

function complexMasks() {
  chai.expect(maskJs('(99) 9999', '777777')).to.equal('(77) 7777');
  chai.expect(maskJs('(99) 9999?9-9999', '12345678')).to.equal('(12) 3456-78');
  chai.expect(maskJs('(99) 9999?9-9999', '1234567')).to.equal('(12) 3456-7');
  chai.expect(maskJs('(9)9?9-9', '(0)12-3')).to.equal('(0)12-3');
  chai.expect(maskJs('(99) 9999?9-9999', '(12) 3456-78')).to.equal('(12) 3456-78');

  chai.expect(maskJs('(99) 9999-9999', '1234567890')).to.equal('(12) 3456-7890');
  chai.expect(maskJs('(99) 99999-9999', '12345678901')).to.equal('(12) 34567-8901');
}

function optionalChars() {
  chai.expect(maskJs('?999', '12')).to.equal('12');
  chai.expect(maskJs('?999', '12345')).to.equal('123');

  chai.expect(maskJs('(99) 9999?9-9999', '1234567890')).to.equal('(12) 3456-7890');
  chai.expect(maskJs('(99) 9?9999-9999', '1234567890')).to.equal('(12) 3456-7890');
  chai.expect(maskJs('(99) 9999?9-9999', '12345678901')).to.equal('(12) 34567-8901');
  chai.expect(maskJs('(99) 9999?9-99999', '123456789012')).to.equal('(12) 34567-89012');

  chai.expect(maskJs('(99) 9999-999?9', '001234567')).to.equal('(00) 1234-567');
  chai.expect(maskJs('(99) 9999-999?9', '0012345678')).to.equal('(00) 1234-5678');
  chai.expect(maskJs('(99) 9999-9999?9', '001234567890')).to.equal('(00) 1234-56789');
}

function multipleOptional() {
  chai.expect(maskJs('(99) ?999?99-9999?9', '001234567890')).to.equal('(00) 12345-67890');
  chai.expect(maskJs('(99) ?999?99-9999?9', '00123456789')).to.equal('(00) 1234-56789');
  chai.expect(maskJs('(99) 9?99?99-99?999', '0012345678')).to.equal('(00) 123-45678');
}

function ignoreNonDigits() {
  chai.expect(maskJs('(99)9?99?99-99?999', '0A12345678')).to.equal('(01)234-5678');
  chai.expect(maskJs('(99)9?99?99-99?999', 'AAA')).to.equal('');
  chai.expect(maskJs('(99)9?99?99-99?999', 'AA1A')).to.equal('(1');
}
