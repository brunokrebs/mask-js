import * as chai from 'chai';
import jsMasker from './index';

describe('Masker', () => {
    it('should be able to import jsMasker', function() {
        chai.expect(jsMasker).to.be.not.null;
        chai.expect(jsMasker).to.be.not.undefined;
    });

    it('should be a function', function() {
        // testing if .bind exists anywhere else
        const emptyObject: any = {};
        const hello: any = 'hello';
        chai.assert.isUndefined(emptyObject.bind);
        chai.assert.isUndefined(hello.bind);

        // now in our function
        chai.assert.isDefined(jsMasker.bind);
    });

    it('should be able to handle empty masks', () => {
        chai.expect(jsMasker('99', '1')).to.equal('1');
        chai.expect(jsMasker('99', '22')).to.equal('22');
        chai.expect(jsMasker('99', '333')).to.equal('33');
        chai.expect(jsMasker('99', '4444')).to.equal('44');
    });

    it('should be able to apply simple masks', function() {
        chai.expect(jsMasker('(99)', '88')).to.equal('(88');
        chai.expect(jsMasker('(99)', '77')).to.equal('(77');
        chai.expect(jsMasker('-99-', '77')).to.equal('-77');
    });

    it('should be able to apply more complex masks', function() {
        chai.expect(jsMasker('(99) 9999', '777777')).to.equal('(77) 7777');
        chai.expect(jsMasker('(99) 9999-9999', '1234567890')).to.equal('(12) 3456-7890');
        chai.expect(jsMasker('(99) 99999-9999', '12345678901')).to.equal('(12) 34567-8901');
    });

    it('should be able to handle optional chars', function() {
        chai.expect(jsMasker('?999', '12')).to.equal('12');
        chai.expect(jsMasker('?999', '12345')).to.equal('123');

        chai.expect(jsMasker('(99) 9999?9-9999', '1234567890')).to.equal('(12) 3456-7890');
        chai.expect(jsMasker('(99) 9?9999-9999', '1234567890')).to.equal('(12) 3456-7890');
        chai.expect(jsMasker('(99) 9999?9-9999', '12345678901')).to.equal('(12) 34567-8901');
        chai.expect(jsMasker('(99) 9999?9-99999', '123456789012')).to.equal('(12) 34567-89012');

        chai.expect(jsMasker('(99) 9999-999?9', '001234567')).to.equal('(00) 1234-567');
        chai.expect(jsMasker('(99) 9999-999?9', '0012345678')).to.equal('(00) 1234-5678');
        chai.expect(jsMasker('(99) 9999-9999?9', '001234567890')).to.equal('(00) 1234-56789');
    });

    it('should be able to multiple optional chars', function() {
        chai.expect(jsMasker('(99) ?999?99-9999?9', '001234567890')).to.equal('(00) 12345-67890');
        chai.expect(jsMasker('(99) ?999?99-9999?9', '00123456789')).to.equal('(00) 1234-56789');
        chai.expect(jsMasker('(99) 9?99?99-99?999', '0012345678')).to.equal('(00) 123-45678');
    });

    it('should ignore non digits', function () {
        chai.expect(jsMasker('(99)9?99?99-99?999', '0A12345678')).to.equal('(01)234-5678');
        chai.expect(jsMasker('(99)9?99?99-99?999', 'AAA')).to.equal('');
        chai.expect(jsMasker('(99)9?99?99-99?999', 'AA1A')).to.equal('(1');
    });
});