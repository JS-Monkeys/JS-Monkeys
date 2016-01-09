'use strict';

let sinon = require('sinon'),
    chai = require('chai'),
    assert = require('assert'),
    expect = chai.expect;

let homeController = require('../source/server/controllers/home-controller');

describe('Home controller', function () {
    describe('GET /', function () {
        it('should respond', function () {
            let req = { isAuthenticated: () => false },
                res = { render: sinon.spy() },
                spy = res.render;

            homeController.homePage(req, res);

            expect(spy.calledOnce).to.equal(true);
        });
    });
});