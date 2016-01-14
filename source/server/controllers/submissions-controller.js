'use strict';

let se = require('../utils/js-execution/submission-evaluator'),
  moment = require('moment');
;

module.exports = function (data) {
  return {
    makeSubmission: function (req, res) {
      console.log('controller');
      se({
        contest: req.body.contest,
        task: req.params.name,
        code: req.body.code,
        user: {
          username: req.user.username,
          id: req.user._id
        }
      }).then(function (response) {
        res.status(200)
          .json(response);
      }, function (error) {
        res.status(500)
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
          res.status(500)
            .json(error);
        });
    },
    userSubmissions: function (req, res) {

      console.log("gertting subs");

      var query = {
        'user.username': req.user.username,
        'problem.name': req.params.problem
      };

      //  console.log(query);

      var sort = {
        sort: {
          madeOn: -1
        },
        skip: 0,
        limit: 0
      };

      data.submissions.findSubmission(query, sort)
        .then(function (subs) {
          let formated = subs.map(function (s) {
            return {
              madeOn: moment(s.madeOn).fromNow(),
              points: s.points,
              id: s._id
            }
          });

          let options = {
            menuResolver: req.menuResolver,
            submissions: formated
          };

          // console.log(options);

          res.render('submissions/submissions-by-problem-single', options);
        }, function (error) {
          res.send(error)
        });
    },
    getFilteredSubmissions: function (req, res) {

      console.log("gertting filtered submisssions");

      console.log(req.query)

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

        //  res.render('submissions/submissions-listed-paging', options);


          data.problems.all().then(function (problems) {

            //console.log(problems)

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
          console.log(err)
        });
    }
  }
};