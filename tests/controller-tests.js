'use strict';

let sinon = require('sinon'),
    chai = require('chai'),
    assert = require('assert'),
    db = require('./db-mock'),
    expect = chai.expect;

let homeController = require('../source/server/controllers/home-controller')(db),
    contestsController = require('../source/server/controllers/contests-controller')(db);
    // submissionsController = require('../source/server/controllers/submissions-controller')(db);

function hasStatusCode(code) {
    return function (statusCode) {
        expect(statusCode).to.equal(code);
        return this.caller;
    }
}

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
        it('byName function should return contest info with correct name and status code 200', function () {
            let req = {
                menuResolver: {},
                isAuthenticated: () => true,
                params: {
                    name: 'c# oop'
                }
            },
                res = {
                    render: function (a, b) {
                        expect(b.currentContest).to.equal('c# oop');
                    },
                    status: hasStatusCode(200)
                };
                
            contestsController.byName(req, res);
        });
    });

    describe('GET /contests/:name', function () {
        it('should response with 404 not found when contest is not found', function () {
            let req = {
                menuResolver: {},
                isAuthenticated: () => true,
                params: {
                    name: 'C#2'
                }
            },
                res = {
                    render: function (a, b) {
                        expect(b.currentContest).to.equal('not found');
                    },
                    status: function (statusCode) {
                        expect(statusCode).to.equal(404);
                    }
                };
                
            contestsController.byName(req, res);
        });
    });
    
    describe('/contests/:name/addproblem', function () {
        it('GET: should respond with 200 and render contest/add-problem template', function () {
            let req = {
                params: {
                    name: 'C#2'
                }
            },
                res = {
                    render: function (a, b) {
                        expect(b.currentContest.name).to.equal('C#2');
                    },
                    status: hasStatusCode(200)
                };
                
            contestsController.addProblemPage(req, res);
        });
        
        it('POST: should respond with 201 and redirect to /contests/:name', function () {
            let req = {
                body: {
                    name: 'C#2',
                    description: 'fun'
                },
                params: {
                    name: 'problemproblem'
                }
            },
                res = {
                    redirect: function (route) {
                        expect(route).to.equal('contests/C#2');
                    },
                    status: hasStatusCode(201)
                };
                
            contestsController.addProblemToContest(req, res);
        });
    });
});

describe('Submissions controller', function () {
   
   describe('/submissions/:id', function () {
       
       
   });
   
   describe('/contests/:name', function () {
       
      // dependency injection
   });
   
   describe('/contests/:name/:problem', function () {
       
    //    it('GET: should respond with status 200 and user submissions', function () {
    //        let req = {
    //            user: {
    //                username: 'penka'
    //            },
    //            problem: {
    //                name: 'dish washing'
    //            }
    //        },
    //            res = {
    //                status: hasStatusCode(200),
    //                render: function (path, opts) {
    //                    expect(path).to.equal('submissions/submissions-by-problem-single');
    //                    expect(opts[0].id).to.equal('1234');
    //                }
    //            };
    //        submissionsController.userSubmissions(req, res)
    //    });
    
    // it('GET: should respond with status 200 and user submissions', function () {
    //        let req = {
    //            user: {
    //                username: 'ginka'
    //            },
    //            problem: {
    //                name: 'dish washing'
    //            }
    //        },
    //            res = {
    //                status: hasStatusCode(200),
    //                render: function (path, opts) {
    //                    expect(path).to.equal('submissions/submissions-by-problem-single');
    //                    expect(opts[0].id).to.equal('1234');
    //                }
    //            };
    //        //submissionsController.userSubmissions(req, res)
    //    });
   });
});