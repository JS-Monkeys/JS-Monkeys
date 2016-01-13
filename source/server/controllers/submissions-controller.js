'use strict';

let se = require('../utils/js-execution/submission-evaluator'),
  moment = require('moment');;

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
    getById: function(req, res){
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

      console.log(query);

      var sort = {
        sort: {
          madeOn: -1
        }
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

          console.log(options);

          res.render('submissions/submissions-by-problem-single', options);
        }, function (error) {
          res.send(error)
        });
    }
  };
};