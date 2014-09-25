/**
 *  The original function is taken from
 *  there:
 *  https://github.com/caolan/async#eachSeries
 *  
 *  how to use it:
 *
 *  asyncIterate([1,2,3,4], function(item, callback) {
 *       console.log(item);
 *       setTimeout(callback,0);
 *  }, function() {
 *       console.log("Done it!");
 *  });
 *  
 * @author Georgi Naumov 
 * gonaumov@gmail.com for contacts 
 * and suggestions
 */
yourApp.service('asyncIterate', function () {
    return function (arr, iterator, callback) {
        callback = callback || function () {};
        if (!arr.length) {
            return callback();
        }
        var completed = 0;
        var iterate = function () {
            iterator(arr[completed], function (err) {
                if (err) {
                    callback(err);
                    callback = function () {};
                }
                else {
                    completed += 1;
                    if (completed >= arr.length) {
                        callback();
                    }
                    else {
                        iterate();
                    }
                }
            });
        };
        iterate();
    };
});
