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

    it('should be able to apply a simple mask', function() {
        chai.expect(jsMasker('(99)', '88')).to.equal('(88)');
    });
});