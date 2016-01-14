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
            res.status(200).render('course/all', req);
        },
        byName: function (req, res) {
            data.courses
                .byName(req.params.name)
                .then(function (result) {

                    res.status(200)
                        .render('course/course', {
                            course: result,
                            menuResolver: req.menuResolver
                        });
                }, function (error) {
                    res.json(error);
                });
        },
        getAddCourse: function (req, res) {
            res.status(200).render('course/add-course', req);
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