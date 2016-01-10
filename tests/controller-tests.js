'use strict';

let sinon = require('sinon'),
    chai = require('chai'),
    assert = require('assert'),
    expect = chai.expect;

let homeController = require('../source/server/controllers/home-controller')({}),
    contestsController = require('../source/server/controllers/contests-controller')({
        contests: {
            byName: function (name) {

                let contests = ['js ui & dom', 'c# oop']

                let promise = new Promise(function (resolve, reject) {
                    if (contests.indexOf(name) === -1) {
                        return reject('not found');
                    }
                    console.log(name);
                    resolve({
                        name
                    });
                });

                return promise;
            }
        }
    });

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

    describe('GET /private', function () {
        it('should return <h1>Authorized!</h1> when authorized', function () {
            let result,
                req = { isAuthenticated: () => true },
                res = { send: html => result = html };

            homeController.homePrivate(req, res);

            expect(result).to.equal('<h1>Authorized!</h1>');
        });
    });
});

describe('Contests controller', function () {
    describe('GET /contests/:name', function () {
        it('should return contest info with correct name', function () {
            
            let args;
            
            let req = { menuResolver: {}, params: { name: 'c# oop' } },
                res = { render: (arg1, arg2) => args = [arg1, arg2] };
                
            contestsController.byName(req, res);
            expect(args.toString()).to.equal(['contest/contest', {
                menuResolver: {},
                currentContest: req.params.name
            }].toString());
        });
    });

    describe('GET /contests/:name', function () {
        it('should response with not found when contest is not found', function () {
            let req = { menuResolver: {}, params: { name: 'web services & cloud' } },
                res = { status: sinon.spy() },
                spy = res.status;
            spy.returnValue = { json: err => err };
            contestsController.byName(req, res);
            
            //expect(spy.calledOnce).to.equal(true);
            expect(spy.args[0]).to.equal(404);
        });
    });
});