'use strict';

let mongoose = require('mongoose'),
  Problem = mongoose.model('Problem'),
  Submission = mongoose.model('Submission'),
  Users = mongoose.model('User');

function all() {
  let promise = new Promise(function (resolve, reject) {
    Submission.find({}, function (error, dbSubmissions) {
      if (error) {
        return reject(error);
      }

      resolve(dbSubmissions);
    })
  });

  return promise;
}

function createSubmission(submission) {
  let promise = new Promise(function (resolve, reject) {
    let data = require('../data');

    if (!submission || !submission.problem) {
      return reject('request is missing the problem id or problem name');
    }

    data.problems
      .findProblemByContest(submission.contest, submission.problem.name)
      .then(function (problem) {
        submission.problemId = problem._id;

        let searchOptions = {
          problem: {
            name:
            problem.name
          },
          user: {
            username: submission.user.username,
            id: submission.user.id + ''
          }
        };

        Submission.find(searchOptions, function (err, contestSubs) {

          let best = contestSubs.sort((x, y) => y.points - x.points)[0];
          //console.log(best);
          if ((best && submission.points >= best.points) || !best) {
            Users.findOne({ username: submission.user.username }, function (err, user) {
              if (err) {
                console.log(err);
                return reject(err);
              }

              if (best) {
                user.points += submission.points - best.points;
                console.log('points update 1: ' + (submission.points + best.points));
              } else {
                user.points += submission.points;
                console.log('points update 2: ' + submission.points);
              }

              user.save(function (err, res) {
                if(err) {
                  console.log(err);
                  return;
                }

                console.log(res);
              });

            });
          }

          Submission.create(submission, function (error, sub) {
            problem.submissionIds.push(sub._id);

            resolve(sub);
          });
        });

      }, function (error) {
        reject(error);
      });

  });

  return promise;
}

function findSubmission(filter, sort) {
  filter = filter || {};

  if (filter.id) {
    filter._id = filter.id;
    filter.id = undefined;
  }

  let promise = new Promise(function (resolve, reject) {

    Submission.find(filter, null, sort, function (error, dbSub) {
      if (error) {
        return reject(error);
      }

      resolve(dbSub);
    });

  });

  return promise;
}

function findById(id) {
  let promise = new Promise(function (resolve, reject) {

    Submission.findById(id, function (error, dbSub) {
      if (error) {
        return reject(error);
      }

      resolve(dbSub);
    });
  });

  return promise;
}

module.exports = {
  name: 'submissions',
  services: {
    all,
    createSubmission,
    findSubmission,
    findById
  }
};