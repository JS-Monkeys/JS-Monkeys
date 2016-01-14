'use strict';

module.exports = function (data, uploadingService, markdownRenderer) {
  return {
    all: function (req, res) {

      console.log("gertting filtered submisssions");

      console.log(req.query)

      let query = req.query;
      let order = query.order | 0;
      let page = (req.query.page != undefined && +req.query.page > 0) ? +req.query.page : 1;
      let pageSize = (query.pageSize | 0) || 10;

      var filter = {};

      if (!!query.name) {
        filter = {
          'name': query.name,
        }
      }

      console.log(filter);

      var sort = {
        skip: (page - 1) * pageSize,
        limit: pageSize,
        sort: {
          endDate: -1
        }
      };

      if (query.sort === "name") {
        sort.sort = {
          name: order
        }
      }

      if (query.sort === "startDate") {
        sort.sort = {
          startDate: order
        }
      }

      if (query.sort === "endDate") {
        sort.sort = {
          'endDate': order
        }
      }

      console.log(sort);

      data.contests.all(filter, sort)
        .then(function (cnts) {

          console.log(cnts)
          let formated = cnts.map(function (c) {
            return {
              id: c._id,
              name: c.name,
              endDate: c.endDate,
              startDate: c.startDate,
              problems: c.problems,
              submissionsIds: c.submissionsIds
            }
          });

          var options = {
            menuResolver: req.menuResolver,
            contests: formated || [],
            params: {
              name: query.name,
              sort: query.sort,
              order: query.order
            },
            page: page,
            pageSize: pageSize
          };

          res.render('contest/all', options);
        }, function (error) {
          res.render('shared/server-error', req);
        });
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
            .render('shared/not-found', req)
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

      if (!problem.name || !problem.description) {
        res.status(400)
          .render('<h1>Bad request!</h1>');
      }

      data.contests.addProblemToContest(req.params.name, problem)
        .then(function (dbRes) {
            res.status(201)
              .redirect('/contests/' + req.params.name);

            uploadingService.createDir('', dbRes.name);
          },
          err => res.status(500).redirect('/server-error', req));
    },
    create: function (req, res) {
      data.contests.create(req.body)
        .then(contest => res.status(201).redirect('/contests/' + contest),
          error => res.status(500).redirect('/server-error', req));
    }
  };
};