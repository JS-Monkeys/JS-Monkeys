'use strict';

module.exports = function (data, uploadingService, markdownRenderer) {
  return {
    all: function (req, res) {
      data.contests.all()
        .then(contests => res.json(contests), error => res.json(error));
    },
    byName: function (req, res) {
      data.contests.byName(req.params.name)
        .then(function (contest) {

          res.status(200)
            .render('contest/contest', {
              menuResolver: req.menuResolver,
              currentContest: contest,
              marked: markdownRenderer
            });

        }, function (error) {
          res.status(404)
            .render('not-found', {})
        });
    },
    addProblemPage: function (req, res) {
      res.status(200)
        .render('contest/add-problem', {
          currentContest: {name: req.params.name},
          menuResolver: req.menuResolver
        });
    },
    addProblemToContest: function (req, res) {

      let problem = {
        name: req.body.name,
        description: req.body.description,
        points: req.body.points,
        constraints: {timeout: req.body.timeout}
      };

      if(!problem.name || !problem.description) {
        res.status(400)
          .render('<h1>Bad request!</h1>');
      }

      data.contests.addProblemToContest(req.params.name, problem)
        .then(function (dbRes) {
            res.status(201)
              .redirect('/contests/' + req.params.name);

            uploadingService.createDir('', dbRes.name);
          },
          err => res.status(500).json(err));
    },
    create: function (req, res) {
      data.contests.create(req.body)
        .then(contest => res.status(201).redirect('/contests/' + contest),
          error => res.status(500).json(error));
    }
  };
};