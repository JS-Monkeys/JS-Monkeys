'use strict';

let se = require('../utils/js-execution/submission-evaluator'),
  moment = require('moment');

module.exports = function (data, evaluateSubmission, dateFormatter) {
  return {
    makeSubmission: function (req, res) {

      let newSubmission = {
        contest: req.body.contest,
        task: req.params.name,
        code: req.body.code,
        user: {
          username: req.user.username,
          id: req.user._id
        }
      };

      if (!newSubmission.contest || !newSubmission.task) {
        res.status(400)
          .json('invalid submission');
      }

      evaluateSubmission(newSubmission).then(function (response) {
        res.status(200)
          .json(response);
      }, function (error) {
        res.status(400)
          .json(error);
      });
    },
    getSubmissions: function (req, res) {
      data.submissions.all()
        .then(function (response) {
          res.status(200)
            .json(response);
        }, function (error) {
          res.status(500)
            .json(error);
        });
    },
    getById: function (req, res) {
      let id = req.params.id || "";

      data.submissions.findById(id)
        .then(function (response) {
          res.status(200)
            .json(response);
        }, function (error) {
          res.status(404)
            .render('not-found', {});
        });
    },
    renderById: function (req, res) {
      let id = req.params.id || "";

      data.submissions.findById(id)
        .then(function (submission) {

          let formated = {
              madeOn: moment(submission.madeOn).fromNow(),
              points: submission.points,
              id: submission._id,
              user: submission.user,
              problem: submission.problem,
              code: submission.code
            };

          let options ={
            menuResolver: req.menuResolver,
            submission: formated
          };
          res.status(200)
            .render('submissions/submission-detailed', options);
        }, function (error) {
          res.status(404)
            .render('not-found', {});
        });
    },
    userSubmissions: function (req, res) {

      console.log("gertting subs");

      let query = {
        'user.username': req.user.username,
        'problem.name': req.params.problem
      };

      console.log(query);

      let sort = {
        sort: {
          madeOn: -1
        }
      };

      data.submissions.findSubmission(query, sort)
        .then(function (subs) {
          let formated = subs.map(function (s) {
            return {
              madeOn: dateFormatter(s.madeOn).startOf("hour").fromNow(),
              points: s.points,
              id: s._id
            }
          });

          let options = {
            menuResolver: req.menuResolver,
            submissions: formated
          };

         // console.log(options);

          res.status(200)
            .render('submissions/submissions-by-problem-single', options);
        }, function (error) {
          res.status(404).render('not-found', {});
        });
    },
    getFilteredSubmissions: function (req, res) {

      console.log("gertting filtered submisssions");

      //console.log(req.query)

      let query = req.query;
      let order = query.order | 0;
      let skip = ((query.page | 0)) || 0;
      let limit = (query.psgeSize | 0) || 0;

      var filter = {};

      console.log("QU: " + query.user)

      if (!!query.user) {
        filter = {
          'user.username': query.user,
        }
      }

      if (!!query.problem) {
        filter = {
          'problem.name': query.problem,
        }
      }

      console.log(filter);

      var sort = {
        skip: skip,
        limit: limit,
        sort: {
          madeOn: -1
        }
      };

      if(query.sort === "madeOn"){
        sort.sort = {
          madeOn: order
        }
      }

      if(query.sort === "points"){
        sort.sort = {
          points: order
        }
      }

      if(query.sort === "user"){
        sort.sort = {
          'user.username': order
        }
      }

      if(query.sort === "problem"){
        sort.sort = {
          'problem.name': order
        }
      }

      console.log(sort);

      data.submissions.findSubmission(filter, sort)
        .then(function (subs) {

          let formated = subs.map(function (s) {
            return {
              madeOn: moment(s.madeOn).fromNow(),
              points: s.points,
              id: s._id,
              user: s.user.username,
              problem: s.problem.name
            }
          });

          data.problems.all().then(function (problems) {

            var options = {
              menuResolver: req.menuResolver,
              problems: problems || [],
              submissions: formated || []
            };

            res.render('submissions/submissions-listed-paging', options);
          }, function (error) {
            res.render('shared/not-found', req);
          });
        }, function(err){
          res.render('shared/not-found', req); // TODO: redirect 500
        });
    }
  };
};