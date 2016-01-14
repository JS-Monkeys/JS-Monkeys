"use strict";

module.exports = function (data) {
  return {
    all: function (req, res) {
      data.courses
        .all()
        .then(function (response) {
          res.json(response);
        }, function (error) {
          res.json(error);
        });
    },
    renderAll: function (req, res) {
      console.log("gertting filtered courses");

      console.log(req.query)

      let query = req.query;
      let order = query.order | 0;
      let page = (req.query.page != undefined && +req.query.page > 0) ? +req.query.page : 1;
      let pageSize = (query.pageSize | 0) || 10;

      var filter = {};


      var sort = {
        skip: (page - 1) * pageSize,
        limit: pageSize,
        sort: {
          madeOn: -1
        }
      };

      if (query.sort === "madeOn") {
        sort.sort = {
          madeOn: order
        }
      }

      console.log(sort);

      data.courses.findFiltered(filter, sort)
        .then(function (crs) {

          console.log(crs);

          let formated = crs.map(function (c) {
            return {
              madeOn: c.madeOn,
              id: c._id,
              videoUrl: c.videoUrl,
              name: c.name
            }
          });

          var options = {
            menuResolver: req.menuResolver,
            courses: formated || [],
            params: {
              sort: query.sort,
              order: query.order
            },
            page: page,
            pageSize: pageSize
          };

          res.render('course/all', options);
        }, function (error) {
          res.render('shared/server-error', req);
        });
    },
    byName: function (req, res) {
      data.courses
        .byName(req.params.name)
        .then(function (result) {

          res.render('course/course', {
            course: result,
            menuResolver: req.menuResolver
          });
        }, function (error) {
          res.json(error);
        });
    },
    getAddCourse: function (req, res) {
      res.render('course/add-course', req);
    },
    add: function (req, res) { // TODO use https://www.youtube.com/embed/_MygxywLO9U to test

      data.courses
        .add(req.body)
        .then(function (response) {
          res.redirect('/courses/' + response.name)
        }, function (error) {
          res.status(500).redirect('/server-error', req)
        });
      //course => res.status(201).redirect('/courses/' + course),
      //error => res.status(500).json(error));
      //function (response) {
      //response.status(201)
      //    .redirect('/courses/' + req.body.name);

      //.render('course/course', {
      //        course: req.body,
      //        menuResolver: req.menuResolver
      //    });
      //res.json(response);
      //}, function (error) {
      //    res.json(error);
      //});
    }
  }
};