'use strict';

// TODO: refresh every 1 minute
const CACHE_REFRESH = 60 * 1000;

let cache = {};

module.exports = function (data) {

    data.contests.all()
        .then(contests => { cache.contests = contests; console.log('figrata'); },
            error => console.log(error));

    setInterval(function () {
        data.contests.all()
            .then(contests => { cache.contests = contests; console.log('figrata'); },
                error => console.log(error));
    }, CACHE_REFRESH);
    
    data.cache = cache;
};