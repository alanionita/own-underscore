const { expect } = require('chai');
const _ = require('../main.js');

describe('_', function () {
    'use strict';
    it('is an object', function () {
        expect(_).to.be.an('object');
    });
});