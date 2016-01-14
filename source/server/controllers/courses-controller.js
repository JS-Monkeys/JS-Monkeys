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
        byName: function (req, res) {
            console.log(req.params);
            data.courses
                .byName(req.params.name)
                .then(function (res) {
                    res.status(200)
                        .render('course/course', {
                            course: res.course,
                            menuResolver: req.menuResolver
                        });
                    res.json(response);
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
                    res.status(201)
                        .render('course/course', {
                            course: req.body,
                            menuResolver: req.menuResolver
                        });
                }, function (error) {
                    res.json(error);
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