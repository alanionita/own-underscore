const { expect } = require('chai');
const sinon = require('sinon');
const _ = require('../main.js');

// Helpers
const { returnObjectValues } = require('../helpers');

// Tests
describe('_.own-underscore', () => {
  'use strict';
  it('is an object', () => {
    expect(_).to.be.an('object');
  });
});

describe('_.identity', () => {
  it('should be a function', () => {
    expect(_.identity).to.exist;
    expect(_.identity).to.be.a('function');
  });
  it('returns the same value passed as an argument', () => {
    const input = 'string';
    const actual = _.identity(input);
    const expected = 'string';

    expect(actual).to.equal(expected);
  });

  describe('_.identity works for all primitive types', () => {
    it('booleans', function() {
      const input = true;
      const actual = _.identity(input);
      const expected = true;

      expect(actual).to.equal(expected);
    });
    it('numbers', function() {
      const input = 1267672673;
      const actual = _.identity(input);
      const expected = 1267672673;

      expect(actual).to.equal(expected);
    });
    it('string', function() {
      const input = 'string';
      const actual = _.identity(input);
      const expected = 'string';

      expect(actual).to.equal(expected);
    });
    it('null', function() {
      const input = null;
      const actual = _.identity(input);
      const expected = null;

      expect(actual).to.equal(expected);
    });
    it('undefined', function() {
      const input = undefined;
      const actual = _.identity(input);

      expect(actual).to.undefined;
    });
  });

  describe('_.identity works for all objects', () => {
    it('objects', function() {
      const input = {
        o: 'o',
        b: 'b',
        j: 'j'
      };
      const actual = _.identity(input);
      const expected = {
        o: 'o',
        b: 'b',
        j: 'j'
      };
      expect(actual).to.eql(expected);
    });
    it('functions', function() {
      const input = function(param) {
        return param;
      };
      const actual = _.identity(input);

      expect(actual).to.equal(input);
    });
    it('arrays', function() {
      const input = ['a', 'r', 'r', 'a', 'y'];
      const actual = _.identity(input);
      const expected = ['a', 'r', 'r', 'a', 'y'];

      expect(actual).to.eql(expected);
    });
  });
});

describe('_.first', () => {
  it('should be a function', () => {
    expect(_.first).to.exist;
    expect(_.first).to.be.a('function');
  });
  it('works with strings', () => {
    const input = 'string';
    const actual1 = _.first(input);
    const actual2 = _.first(input, 2);
    expect(actual1).to.eql('s');
    expect(actual2).to.eql('st');
  });

  it('returns the first element of an array', () => {
    const input = ['a', 'r', 'r', 'a', 'y'];
    const actual = _.first(input);
    const expected = 'a';
    expect(actual).to.equal(expected);
  });
  it('if passed a second argument [n], returns an array of the first [n] x elements', () => {
    const arg1 = ['a', 'r', 'r', 'a', 'y'];
    const arg2 = 2;
    const actual = _.first(arg1, arg2);
    const expected = ['a', 'r'];
    expect(actual).to.eql(expected);
  });
  it('if [n] is greater than the array length, return the whole array', () => {
    const list = ['a', 'r', 'r', 'a', 'y'];
    const n = Infinity;
    const actual = _.first(list, n);
    const expected = ['a', 'r', 'r', 'a', 'y'];
    expect(actual).to.eql(expected);
  });
});
describe('_.last', () => {
  it('should be a function', () => {
    expect(_.last).to.exist;
    expect(_.last).to.be.a('function');
  });
  it('works with strings', () => {
    const input = 'string';
    const actual = _.last(input);
    expect(actual).to.eql('g');
  });
  it('returns the last element of an array', () => {
    const input = ['a', 'r', 'r', 'a', 'y'];
    const actual = _.last(input);
    const expected = 'y';
    expect(actual).to.equal(expected);
  });
  it('if passed a second argument [n], returns an array of the last [n] x elements', () => {
    const arg1 = ['a', 'r', 'r', 'a', 'y'];
    const arg2 = 2;
    const actual = _.last(arg1, arg2);
    const expected = ['a', 'y'];
    expect(actual).to.eql(expected);
  });
  it('if [n] is greater than the array length, return the whole array', () => {
    const arg1 = ['a', 'r', 'r', 'a', 'y'];
    const arg2 = Infinity;
    const actual = _.last(arg1, arg2);
    const expected = ['a', 'r', 'r', 'a', 'y'];
    expect(actual).to.eql(expected);
  });
  it('returns undefined for objects', () => {
    const input = {
      '0': 3,
      '1': 2
    };
    const actual = _.last(input);
    expect(actual).to.be.undefined;
  });
});

describe('_.each', () => {
  it('should be a function', () => {
    expect(_.each).to.exist;
    expect(_.each).to.be.a('function');
  });
  it('iterates over a list of elements, yielding each in turn to an iteratee function', () => {
    const list = ['a', 'r', 'r', 'a', 'y'];
    const spy = sinon.spy();
    _.each(list, spy);
    expect(spy.callCount).to.equal(list.length);
  });
  it('should call the iteratee with three paramaters: element + index + list or value + key + list', () => {
    const list = ['a'];
    const spy = sinon.spy();
    _.each(list, spy);
    const argsPassedToIteratee = spy.args[0];
    expect(argsPassedToIteratee.length).to.equal(3);
  });
  it('when context param is present, bind the iteratee to the context', () => {
    const spy = sinon.spy();

    // declaring the paramaters for the _each function

    const list = ['1', '2', '3'];
    const context = {
      a: 4,
      b: 5,
      c: 6
    };
    _.each(list, spy, context);
    // checking spy properties
    const callCount = spy.callCount;
    const firstCall = spy.firstCall.thisValue;
    const secondCall = spy.secondCall.thisValue;
    const thirdCall = spy.thirdCall.thisValue;
    expect(callCount).to.be.equal(3);
    expect(firstCall).to.be.eql(context);
    expect(secondCall).to.be.eql(context);
    expect(thirdCall).to.be.eql(context);
  });
  describe('behaviour for each primitive type', () => {
    it('booleans return undefined', () => {
      const list = true;
      let counter = 0;
      function iteratee() {
        return counter++;
      }
      _.each(list, iteratee);
      expect(counter).to.equal(0);
    });
    it('numbers return undefined', () => {
      const list = 1267672673;
      let counter = 0;
      function iteratee() {
        return counter++;
      }
      _.each(list, iteratee);
      expect(counter).to.equal(0);
    });
    it('works with strings', () => {
      const list = 'string';
      let counter = 0;
      function iteratee() {
        return counter++;
      }
      _.each(list, iteratee);
      expect(counter).to.equal(6);
    });
    it('null returns undefined', () => {
      const list = null;
      let counter = 0;
      function iteratee() {
        return counter++;
      }
      _.each(list, iteratee);
      expect(counter).to.equal(0);
    });
    it('undefined returns undefined', () => {
      const list = undefined;
      let counter = 0;
      function iteratee() {
        return counter++;
      }
      _.each(list, iteratee);
      expect(counter).to.equal(0);
    });
  });
});

describe('_.indexOf', () => {
  it('should be a function', () => {
    expect(_.indexOf).to.exist;
    expect(_.indexOf).to.be.a('function');
  });
  it('only works with arrays passed as first param', () => {
    const input = 'string';
    const actual = _.indexOf(input, 'r');
    expect(actual).to.eql(2);
  });
  it('returns the index of the value when found in the array', () => {
    const array = [1, 2, 3];
    const value = 3;
    const actual = _.indexOf(array, value);
    expect(actual).to.be.equal(2);
  });
  it('returns -1 if the index is not found in the array', () => {
    const array = [1, 2, 3];
    const value = 7;
    const actual = _.indexOf(array, value);
    expect(actual).to.be.equal(-1);
  });
  it('returns the index of the first value more than one targets are found in the array', () => {
    const array = [1, 2, 2, 2, 2, 3];
    const value = 2;
    const actual = _.indexOf(array, value);
    expect(actual).to.be.equal(1);
  });
  it('if isSorted is passed then use binary search', () => {
    const array = [1, 2, 3, 4, 5, 6, 7];
    const value = 7;
    const actual = _.indexOf(array, value, true);
    expect(actual).to.be.equal(6);
  });
  it('checks that binary search is faster than regular method', () => {
    const array = [
      1,
      2,
      3,
      4,
      5,
      6,
      7,
      8,
      9,
      10,
      11,
      12,
      13,
      14,
      15,
      16,
      18,
      19,
      20
    ];
    const value = 4;

    // binary times
    const binaryStart = process.hrtime();
    _.indexOf(array, value, true);
    const binaryStop = process.hrtime();
    const binaryRuntime = binaryStop[1] - binaryStart[0];

    // regular times
    const regularStart = process.hrtime();
    _.indexOf(array, value, false);
    const regularStop = process.hrtime();
    const regularRuntime = regularStop[1] - regularStart[0];

    expect(regularRuntime).to.be.greaterThan(binaryRuntime);
  });
});

describe('_.filter', () => {
  it('should be a function', () => {
    expect(_.filter).to.exist;
    expect(_.filter).to.be.a('function');
  });
  it('works with arrays, strings, and objects', () => {
    const input1 = {
      '0': 1,
      '1': 2,
      '2': 3
    };
    const input2 = [1, 2, 3];
    const input3 = '123';
    const actual1 = _.filter(input1, num => num % 2 === 0);
    const actual2 = _.filter(input2, num => num % 2 === 0);
    const actual3 = _.filter(input3, num => num % 2 === 0);
    expect(actual1).to.be.eql([2]);
    expect(actual2).to.be.eql([2]);
    expect(actual3).to.be.eql(['2']);
  });
  it('when passed an array return an array of all the values that pass the truth test (predicate)', () => {
    const input = [1, 2, 3];
    const predicate = num => num % 2 == 0;
    const actual = _.filter(input, predicate);
    expect(actual).to.be.eql([2]);
  });
  it('when passed an object return an array of all the values that pass the truth test (predicate)', () => {
    const input = {
      x: 1,
      y: 2,
      z: 3
    };
    const predicate = num => num % 2 == 0;
    const actual = _.filter(input, predicate);
    expect(actual).to.be.eql([2]);
  });
  it('when context is passed the predicate is bound to it', () => {
    const spy = sinon.spy();
    // declaring the paramaters for the _each function
    const list = [1, 2, 3];
    const context = {
      a: 4,
      b: 5,
      c: 6
    };
    _.filter(list, spy, context);
    // checking spy properties
    const callCount = spy.callCount;
    const firstCall = spy.firstCall.thisValue;
    const secondCall = spy.secondCall.thisValue;
    const thirdCall = spy.thirdCall.thisValue;
    expect(callCount).to.be.equal(3);
    expect(firstCall).to.be.eql(context);
    expect(secondCall).to.be.eql(context);
    expect(thirdCall).to.be.eql(context);
  });
});

describe('_.reject', function() {
  it('it should be a function', () => {
    expect(_.reject).to.be.a('function');
  });
  it('only works with arrays and objects', () => {
    const input1 = 'string';
    const predicate = elem => elem === 't';
    const actual1 = _.reject(input1, predicate);
    const expected = ['s', 'r', 'i', 'n', 'g'];
    expect(actual1).to.eql(expected);
  });
  it('return an array without the elemets that pass the predicate', () => {
    const list = [1, 2, 3];
    const predicate = function(num) {
      return num % 2 === 0;
    };
    const actual = _.reject(list, predicate);
    const expected = [1, 3];
    expect(actual).to.eql(expected);
  });
  it('works exactly the same with objects', () => {
    const list = {
      '1': 1,
      '2': 2,
      '3': 3
    };
    const predicate = function(num) {
      return num % 2 === 0;
    };
    const actual = _.reject(list, predicate);
    const expected = [1, 3];
    expect(actual).to.eql(expected);
  });
  it('when context is passed the predicate is bound to it', () => {
    const spy = sinon.spy();
    // declaring the paramaters for the _each function

    const list = [1, 2, 3];
    const context = {
      a: 4,
      b: 5,
      c: 6
    };
    _.reject(list, spy, context);
    // checking spy properties
    const callCount = spy.callCount;
    const firstCall = spy.firstCall.thisValue;
    const secondCall = spy.secondCall.thisValue;
    const thirdCall = spy.thirdCall.thisValue;
    expect(callCount).to.be.equal(3);
    expect(firstCall).to.be.eql(context);
    expect(secondCall).to.be.eql(context);
    expect(thirdCall).to.be.eql(context);
  });
});

describe('_.uniq', function() {
  it('it should be a function', () => {
    expect(_.uniq).to.be.a('function');
  });
  it('works with strings', () => {
    const input = 'sttring';
    const actual = _.uniq(input);
    const expected = ['s', 't', 'r', 'i', 'n', 'g'];
    expect(actual).to.eql(expected);
  });
  it('return a copy of the array using only the unique values', () => {
    const input = [1, 2, 2, 3];
    const actual = _.uniq(input);
    const expected = [1, 2, 3];
    expect(actual).to.eql(expected);
  });

  it('returns a copy of the array using only the unique values, when the array is sorted', () => {
    const input = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3];
    const actual = _.uniq(input, true);
    const expected = [1, 2, 3];
    expect(actual).to.eql(expected);
  });

  it('returns a copy of the array using only the unique values, when the iteratee is passed', () => {
    const input = [1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 2, 2, 3];
    const iteratee = num => {
      if (num % 2 === 0) return num;
    };
    const actual = _.uniq(input, false, iteratee);
    const expected = [2];
    expect(actual).to.eql(expected);
  });
});

describe('_.map', function() {
  it('should be a function', () => {
    expect(_.map).to.be.a('function');
  });
  it('produces a new array, after transforming each elem using the iteratee function', () => {
    const list = [1, 2, 3];
    const iteratee = function(num) {
      return num * 3;
    };
    const expected = [3, 6, 9];
    expect(_.map(list, iteratee)).to.eql(expected);
  });
  it('when context is passed, bind the iteratee to the context', function() {
    const spy = sinon.spy();
    const list = [1, 2, 3];
    const context = {
      a: 4,
      b: 5,
      c: 6
    };
    _.map(list, spy, context);
    // checking spy properties
    const callCount = spy.callCount;
    const firstCall = spy.firstCall.thisValue;
    const secondCall = spy.secondCall.thisValue;
    const thirdCall = spy.thirdCall.thisValue;
    expect(callCount).to.be.equal(3);
    expect(firstCall).to.be.eql(context);
    expect(secondCall).to.be.eql(context);
    expect(thirdCall).to.be.eql(context);
  });
});

describe('_.contains', function() {
  it('should be a function', () => {
    expect(_.contains).to.be.a('function');
  });
  it('should return true if the value is present in the list', () => {
    const value = 2;
    const list = [1, 2, 3];
    expect(_.contains(list, value)).to.be.true;
  });
  it('when fromIndex is passed start searching from that index', () => {
    const value = 2;
    const list = [4, 1, 2, 3];
    const fromIndex = 3;
    expect(_.contains(list, value, fromIndex)).to.be.false;
  });
  it('works with objects', () => {
    const value = 2;
    const list = {
      '1': 1,
      '2': 2,
      '3': 3
    };
    expect(_.contains(list, value)).to.be.true;
  });
});

describe('_.pluck', function() {
  it('should exist and be a function', () => {
    expect(_.pluck).to.exist;
    expect(_.pluck).to.be.a('function');
  });
  it('extracts the list of property values from a collection', () => {
    const stooges = [
      { name: 'moe', age: 40 },
      { name: 'larry', age: 50 },
      { name: 'curly', age: 60 }
    ];
    const expected = ['moe', 'larry', 'curly'];
    expect(_.pluck(stooges, 'name')).to.eql(expected);
  });
});

describe('_.every', function() {
  it('should exist and be a function', () => {
    expect(_.every).to.exist;
    expect(_.every).to.be.a('function');
  });
  it('returns the right value if elements in the collection are all truthy or falsy', () => {
    expect(_.every([null, 0, 'yes', false])).to.be.false;
    expect(_.every([1, 2, 3])).to.be.true;
  });
  it('returns true if all of the values in the list pass the predicate truth test', () => {
    const collection = [2, 4, 5];
    const predicate = function(num) {
      return num % 2 == 0;
    };
    expect(_.every(collection, predicate)).to.be.false;
  });
  it('should work with objects', () => {
    const collection = {
      '0': '2',
      '1': '4',
      '2': '6'
    };
    const predicate = function(num) {
      return num % 2 == 0;
    };
    expect(_.every(collection, predicate)).to.be.true;
  });
  it('when context param is present, bind the predicate to the context', function() {
    const spy = sinon.spy();
    // declaring the paramaters for the _every function
    const collection = ['1', '2', '4'];
    const context = {
      '0': '2',
      '1': '4',
      '2': '6'
    };
    _.every(collection, spy, context);
    // checking spy properties
    expect(spy.callCount).to.be.equal(3);
    return spy.thisValues.map(elem => {
      expect(elem).to.eql(context);
    });
  });
});

describe('_.some', function() {
  it('should exist and be a function', () => {
    expect(_.some).to.exist;
    expect(_.some).to.be.a('function');
  });
  it('returns true if any of the values in the list pass the predicate truth test', () => {
    const collection = [1, 3, 4];
    const predicate = function(num) {
      return num % 2 == 0;
    };
    expect(_.some(collection, predicate)).to.be.true;
  });
  it('returns false if none of the values pass the predicate truth test', () => {
    const collection = [1, 3, 5];
    const predicate = function(num) {
      return num % 2 == 0;
    };
    expect(_.some(collection, predicate)).to.be.false;
  });
  it('checks that the functionality works with objects', () => {
    const collection = {
      '0': '1',
      '1': '3',
      '2': '5'
    };
    const predicate = function(num) {
      return num % 2 == 0;
    };
    expect(_.some(collection, predicate)).to.be.false;
  });
  it('when context param is present, bind the predicate to the context', function() {
    const spy = sinon.spy();

    // declaring the paramaters for the _every function

    const collection = ['1', '3', '5'];
    const context = {
      '0': '2',
      '1': '4',
      '2': '6'
    };
    _.some(collection, spy, context);
    // checking spy properties
    const callCount = spy.callCount;
    const firstCall = spy.firstCall.thisValue;
    const secondCall = spy.secondCall.thisValue;
    const thirdCall = spy.thirdCall.thisValue;
    expect(callCount).to.be.equal(3);
    expect(_.some(collection, spy, context)).to.be.false;
    expect(firstCall).to.be.eql(context);
    expect(secondCall).to.be.eql(context);
    expect(thirdCall).to.be.eql(context);
  });
});

describe('_.extend', function() {
  it('should exist and be a function', () => {
    expect(_.extend).to.exist;
    expect(_.extend).to.be.a('function');
  });
  it('copy all of the properties in the source objects over to the destination object, and return the destination object', () => {
    const destination = { name: 'moe' };
    const source1 = { age: 50 };
    const source2 = { location: 'Manchester' };
    const expected = { name: 'moe', age: 50, location: 'Manchester' };
    expect(_.extend(destination, source1, source2)).to.eql(expected);
  });
  it('the last source will override properties of the same name in previous arguments', () => {
    const destination = { name: 'moe' };
    const source1 = { age: 50 };
    const source2 = { location: 'Manchester' };
    const source3 = { age: 80 };
    const expected = { name: 'moe', age: 80, location: 'Manchester' };
    expect(_.extend(destination, source1, source2, source3)).to.eql(expected);
  });
});

describe('_.defaults', function() {
  it('should exist and be a function', () => {
    expect(_.defaults).to.exist;
    expect(_.defaults).to.be.a('function');
  });
  it('fill in undefined properties in object with the first value present in the following list of defaults objects', () => {
    const iceCream = { flavor: 'chocolate' };
    const expected = { flavor: 'chocolate', sprinkles: 'lots' };
    expect(
      _.defaults(iceCream, { flavor: 'vanilla', sprinkles: 'lots' })
    ).to.eql(expected);
  });
});

describe('_.reduce', function() {
  it('should exist and be a function', () => {
    expect(_.reduce).to.exist;
    expect(_.reduce).to.be.a('function');
  });
  it('boils down a list of values into a single value', () => {
    const list = [1, 2, 3];
    expect(
      _.reduce(
        list,
        function(memo, num) {
          return memo + num;
        },
        0
      )
    ).to.eql(6);
  });
  it('if memo is not passed the first element of the list is used', () => {
    const list = [1, 2, 3];
    expect(
      _.reduce(list, function(memo, num) {
        return memo + num;
      })
    ).to.eql(6);
  });
});

describe('_.once', function() {
  it('should exist and be a function', function() {
    expect(_.once).to.be.a('function');
  });
  it('function should only we called once', function() {
    const spy = sinon.spy();
    const testLimit = _.once(spy);
    _.once(spy);
    _.once(spy);
    _.once(spy);
    _.once(spy);
    _.once(spy);
    _.once(spy);
    testLimit();
    expect(spy.callCount).to.equal(1);
  });
  it('it only works with functions', () => {
    const input = 'string';
    expect(_.once(input)).to.a('function');
  });
});

describe('_.shuffle', function() {
  it('should exist and be a function', () => {
    expect(_.shuffle).to.exist;
    expect(_.shuffle).to.be.a('function');
  });
  it('return a shuffled copy of the list using Fisher-Yates shuffle', () => {
    const list = [1, 2, 3, 4, 5, 6];
    const output = _.shuffle(list);
    expect(list.length).to.equal(output.length);
    expect(output).to.have.members(list);
  });
  it('should work for objects', () => {
    const list = {
      a: 1,
      b: 2,
      c: 3,
      d: 4,
      e: 5
    };
    const output = _.shuffle(list);
    const listValues = returnObjectValues(list);
    expect(listValues.length).to.equal(output.length);
    expect(output).to.have.members(listValues);
  });
});

describe('_.invoke', function() {
  it('exists and should be a function', () => {
    expect(_.invoke).to.exist;
    expect(_.invoke).to.be.a('function');
  });
  it('should call the method on every element of the list', () => {
    const list = [[5, 1, 7], [3, 2, 1]];
    const method = 'sort';
    const expected = [[1, 5, 7], [1, 2, 3]];
    expect(_.invoke(list, method)).to.eql(expected);
  });
  it('should return an array with undefined if the method doesnt exist', () => {
    const list = { '1': 1 };
    const method = 'splice';
    const expected = [undefined];
    expect(_.invoke(list, method)).to.eql(expected);
  });
  it('when passed arguments, they should be passed to the method', () => {
    const list = [[5, 1, 7], [3, 2, 1]];
    const method = 'sort';
    const arg = function(a, b) {
      return b - a;
    };
    const expected = [[7, 5, 1], [3, 2, 1]];
    const actual = _.invoke(list, method, arg);
    expect(actual).to.deep.equal(expected);
  });
});

describe('_,delay', function() {
  let spy;
  beforeEach(function() {
    spy = sinon.spy();
  });

  it('should exist and be a function', () => {
    expect(_.delay).to.exist;
    expect(_.delay).to.be.a('function');
  });
  it('should run the function after wait has passed', () => {
    const clock = sinon.useFakeTimers();
    _.delay(spy, 100);

    clock.tick(1);

    expect(spy.callCount).to.eql(0);

    clock.tick(100);

    expect(spy.callCount).to.eql(1);
  });
  it('should call the function with the passed paramater', () => {
    const clock = sinon.useFakeTimers();
    _.delay(spy, 100, 'param');

    clock.tick(100);
    expect(spy.callCount).to.eql(1);
    expect(spy.args).to.eql([['param']]);
  });
});

describe('_.intersection', function() {
  it('it exists and should be a function', () => {
    expect(_.intersection).to.exist;
    expect(_.intersection).to.be.a('function');
  });
  it('finds the common elements in a collection of arrays, returns them in an array', () => {
    expect(_.intersection([1, 2, 3], [2, 6, 7])).to.be.an('array');
    expect(_.intersection([1, 2, 3], [2, 6, 7])).to.eql([2]);
  });
  it('testing with a bigger collection of arrays', () => {
    expect(
      _.intersection(
        [1, 2, 3],
        [2, 6, 7],
        [2, 9, 10, 11, 23],
        [100, 898, 89898, 2]
      )
    ).to.eql([2]);
  });
});

describe('_.difference', function() {
  it('it exists and should be a function', () => {
    expect(_.difference).to.exist;
    expect(_.difference).to.be.a('function');
  });
  it('returns the elements that are not present in the other arrays', () => {
    expect(_.difference([1, 2, 3, 4, 5], [5, 2, 10])).to.be.an('array');
    expect(_.difference([1, 2, 3, 4, 5], [5, 2, 10])).to.eql([1, 3, 4]);
  });
  it('testing with a bigger collection of arrays', () => {
    expect(
      _.difference(
        [1, 2, 3],
        [2, 6, 7],
        [2, 9, 10, 11, 23],
        [100, 898, 89898, 2]
      )
    ).to.eql([1, 3]);
  });
});

describe('_.flatten', function() {
  it('it exists and should be a function', () => {
    expect(_.flatten).to.exist;
    expect(_.flatten).to.be.a('function');
  });
  it('flattens a nested array', () => {
    expect(_.flatten([1, [2], [3, [[4]]]])).to.eql([1, 2, 3, 4]);
  });
  it('if shallow is passed it only concats one level', () => {
    expect(_.flatten([1, [2], [3, [[4]]]], true)).to.eql([1, 2, 3, [[4]]]);
  });
});

describe('_.sortedIndex', function() {
  it('it exists and should be a function', () => {
    expect(_.sortedIndex).to.exist;
    expect(_.sortedIndex).to.be.a('function');
  });
  it('use binary search to find the index where the new value should be inserted', () => {
    const list = [10, 20, 30, 40, 50];
    const value = 35;
    expect(_.sortedIndex(list, value)).to.eql(3);
  });
});

describe('_.zip', function() {
  it('it exists and should be a function', () => {
    expect(_.zip).to.exist;
    expect(_.zip).to.be.a('function');
  });
  it('merges together the values of each of the arrays with the values at the corresponding position', () => {
    const output = [
      ['moe', 30, true],
      ['larry', 40, false],
      ['curly', 50, false]
    ];
    expect(
      _.zip(['moe', 'larry', 'curly'], [30, 40, 50], [true, false, false])
    ).to.eql(output);
  });
});

describe('_.sortBy', function() {
  it('it exists and should be a function', () => {
    expect(_.sortBy).to.exist;
    expect(_.sortBy).to.be.a('function');
  });
  it('returns a (stably) sorted copy of the list, ranked in ascending order by the results of running each value though the iteratee', () => {
    const list = [1, 2, 3, 4, 5, 6];
    const iteratee = function(num) {
      return Math.sin(num);
    };
    const expected = [5, 4, 6, 3, 1, 2];
    expect(_.sortBy(list, iteratee)).to.eql(expected);
  });
});

describe('_.memoize', function() {
  let multiply, memoMultiply;

  beforeEach(function() {
    multiply = function(a, b) {
      return a * b;
    };

    memoMultiply = _.memoize(multiply);
  });

  it('should exist and be a function', () => {
    expect(_.memoize).to.exist;
    expect(_.memoize).to.be.a('function');
  });
  it('memoizes a given function by caching the computed result', () => {
    expect(multiply(1, 2)).to.equal(2);
    expect(memoMultiply(1, 2)).to.equal(2);
  });
  it('should only memoize once', () => {
    const spy = sinon.spy();
    const memoSpy = _.memoize(spy);
    memoSpy(10);
    expect(spy.callCount).to.equal(1);
  });
});

describe('_.throttle', function() {
  it('should exist and be a function', () => {
    expect(_.throttle).to.exist;
    expect(_.throttle).to.be.a('function');
  });
  it('calls the passed function once per waiting period', () => {
    const clock = sinon.useFakeTimers();
    let result;
    const callBack = () => {
      result = 'called';
    };
    const throttled = _.throttle(callBack, 1000);

    throttled();
    clock.tick(1500);
    expect(result).to.eql('called');
  });
});
