'use strict';

let sinon = require('sinon'),
    chai = require('chai'),
    assert = require('assert'),
    db = require('./db-mock'),
    expect = chai.expect;

let moment = require('moment'),
    uploading = require('../source/server/utils/uploading');

let homeController = require('../source/server/controllers/home-controller')(db),
    contestsController = require('../source/server/controllers/contests-controller')(db),
    usersController = require('../source/server/controllers/users-controller')(db);

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
                    status: function (code) {
                        expect(code).to.equal(200);
                        return this;
                    },
                    render: function (a, b) {
                        expect(b.currentContest.name).to.equal('C#2');
                    }
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

    describe('/unauthorized', function () {
        it('GET: should respond with 404 and render template', function () {

        });

    });

    describe('/users/rankings', function () {
        it('GET: should respond with 200 and list users ordered by rank', function () {
            let req = {
                query: {
                    page: 1
                }
            },
                res = {
                    status: hasStatusCode(200),
                    render: function (path, opts) {
                        expect(path).to.equal('all-users');
                        expect(opts.map(x => x.username)).to.equal(['penka', 'ginka', 'minka']);
                    }
                };

            usersController.findByRank(req, res);
        });

        it('GET: filter by point query should work', function () {
            let res = {
                status: hasStatusCode(200),
                render: function (path, opts) {
                    expect(path).to.equal('all-users');
                    expect(opts.map(x => x.points).filter(x => x < 25 || x > 40).length).to.be.false;
                }
            };

            usersController.findByRank({ query: { from: 25, to: 40 } }, res);
        });

    });

    describe('/users/details', function () {
        it('GET: should respond with code 200 and render user-details template', function () {
            let req = {
                query: {
                    username: 'penka'
                }
            },
                res = {
                    status: hasStatusCode(200),
                    render: function (path, opts) {
                        expect(path).to.equal('user-details');
                        expect(opts.user.username).to.equal('penka');
                    }
                };

            usersController.byUsername(req, res);
        });

        it('GET: should respond with code 404 and render not-found with bad query', function () {
            let req = {
                query: {
                    username: 'asdsadasda_fsdf'
                }
            },
                res = {
                    status: hasStatusCode(404),
                    render: function (path, opts) {
                        expect(path).to.equal('not-found');
                    }
                };

            usersController.byUsername(req, res);
        });
    });


});

describe('Users controller', function () {

    describe('/users', function () {

        it('POST: should respond with 201 and json user in case of success', function () {
            let req = {
                body: {
                    user: {
                        username: 'kaka',
                        password: 'ginka'
                    }
                }
            },
                res = {
                    status: hasStatusCode(201),
                    json: function (opts) {
                        expect(opts).to.equal(req.body.user);
                    }
                };

            usersController.registerUser(req, res);
        });

        it('POST: should respond with 400 and json error in case of error', function () {
            let req = {
                body: {

                }
            },
                res = {
                    status: hasStatusCode(400),
                    json: function (error) {
                        expect(error).to.equal('error');
                    }
                };

            usersController.registerUser(req, res);
        });
    });
});

describe('Courses controller', function () {
    
    let controller = require('../source/server/controllers/courses-controller')(db);
    
    describe('/courses', function () {

        it('GET: should respond with 200 and render all-courses with all courses', function () {
            let req = {},
                res = {
                    status: function (code) {
                        return this;
                    },
                    render: function (path, opts) {
                        expect(path).to.equal('course/all');
                    }
                };
             
             controller.renderAll(req, res);
        });

    });
    
    describe('/courses/:name', function () {

        it('GET: should respond with 200 and render course with found course as option', function () {
            let req = {
                params: {
                    name: 'bop'
                }
            },
                res = {
                    status: function (code) {
                        return this;
                    },
                    render: function (path, opts) {
                        expect(path).to.equal('course/course');
                        expect(opts).to.equal('bop');
                    }
                };
             
             controller.byName(req, res);
        });

    });
    
    describe('/add', function () {

        it('GET: should respond with 200 and render add course', function () {
            let req = {},
                res = {
                    status: function (code) {
                        expect(code).to.equal(200);
                        return this;
                    },
                    render: function (path, opts) {
                        expect(path).to.equal('course/add-course');
                    }
                };
             
             controller.getAddCourse(req, res);
        });

    });
});