const { expect } = require('chai');
const _ = require('../main.js');

describe('_ = own-underscore', function () {
    'use strict';
    it('is an object', function () {
        expect(_).to.be.an('object');
    });
});

describe('_.identity', function () {
    it('should be a function', function () {
        expect(_.identity).to.exist;
        expect(_.identity).to.be.a('function');
    });
    it('returns the same value passed as an argument', function () {
        let input = 'string';
        let actual = _.identity(input);
        let expected = 'string';

        expect(actual).to.equal(expected);
    });

    describe('_.identity works for all primitive types', function () {
        it('booleans', function () {
            let input = true;
            let actual = _.identity(input);
            let expected = true;

            expect(actual).to.equal(expected);
        });
        it('numbers', function () {
            let input = 1267672673;
            let actual = _.identity(input);
            let expected = 1267672673;

            expect(actual).to.equal(expected);
        });
        it('string', function () {
            let input = 'string';
            let actual = _.identity(input);
            let expected = 'string';

            expect(actual).to.equal(expected);
        });
        it('null', function () {
            let input = null;
            let actual = _.identity(input);
            let expected = null;

            expect(actual).to.equal(expected);
        });
        it('undefined', function () {
            let input;
            let actual = _.identity(input);

            expect(actual).to.undefined;
        });
    });

    describe('_.identity works for all objects', function () {
        it('objects', function () {
            let input = {
                o: 'o',
                b: 'b',
                j: 'j',
            };
            let actual = _.identity(input);
            let expected = {
                o: 'o',
                b: 'b',
                j: 'j',
            };
            expect(actual).to.eql(expected);
        });
        it('functions', function () {
            let input = function (param) { return param; };
            let actual = _.identity(input);

            expect(actual).to.equal(input);
        });
        it('arrays', function () {
            let input = ['a', 'r', 'r', 'a', 'y'];
            let actual = _.identity(input);
            let expected = ['a', 'r', 'r', 'a', 'y'];

            expect(actual).to.eql(expected);
        });
    });
});

describe('_.first', function () {
    it('should be a function', function () {
        expect(_.first).to.exist;
        expect(_.first).to.be.a('function');
    });
    it('only works with arrays', function () {
        let input = 'string';
        let actual = _.first(input);
        expect(actual).to.be.undefined;
    });

    it('returns the first element of an array', function () {
        let input = ['a', 'r', 'r', 'a', 'y'];
        let actual = _.first(input);
        let expected = 'a';
        expect(actual).to.equal(expected);
    });
    it('if passed a second argument [n], returns an array of the first [n] x elements', function () {
        let arg1 = ['a', 'r', 'r', 'a', 'y'];
        let arg2 = 2;
        let actual = _.first(arg1, arg2);
        let expected = ['a', 'r'];
        expect(actual).to.eql(expected);
    });
    it('if [n] is greater than the array length, return the whole array', function () {
        let arg1 = ['a', 'r', 'r', 'a', 'y'];
        let arg2 = Infinity;
        let actual = _.first(arg1, arg2);
        let expected = ['a', 'r', 'r', 'a', 'y'];
        expect(actual).to.eql(expected);
    });
});
describe('_.last', function () {
    it('should be a function', function () {
        expect(_.last).to.exist;
        expect(_.last).to.be.a('function');
    });
    it('only works with arrays', function () {
        let input = 'string';
        let actual = _.last(input);
        expect(actual).to.be.undefined;
    });
    });