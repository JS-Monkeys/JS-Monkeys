'use strict';

let mongoose = require('mongoose'),
  Course = mongoose.model('Course');

function findCourse(name) {

  let promise = new Promise(function (resolve, reject) {

    Course.findOne({name: name}, function (error, course) {
      if (error) {
        return reject(error);
      }
      resolve(course);
    });
  });

  return promise;
}

function all(options) {

  let promise = new Promise(function (resolve, reject) {

    Course.find(options, function (error, course) {
      if (error) {
        return reject(error);
      }
      resolve(course);
    });
  });

  return promise;
}

function findFiltered(filter, sort) {

  filter = filter || {};

  if (filter.id) {
    filter._id = filter.id;
    filter.id = undefined;
  }

  let promise = new Promise(function (resolve, reject) {

    Course.find(filter, null, sort, function (error, dbSub) {
      if (error) {
        return reject(error);
      }

      resolve(dbSub);
    });

  });

  return promise;
}

function add(course) {
  //console.log(course);
  let dbCourse = {
    name: course.name,
    videoUrl: course.videoUrl
  };

  let promise = new Promise(function (resolve, reject) {
    Course.create(dbCourse, function (error, createdCourse) {
      if (error) {

        reject(error);
      }

      resolve(createdCourse);
    });
  });

  return promise;
}

module.exports = {
  name: 'courses',
  services: {
    byName: function (name) {
      return findCourse(name);
    },
    all: all,
    add: add,
    findFiltered: findFiltered
  }
};