var mongoose = require('mongoose');
var Promise = require("bluebird");

var Job = mongoose.model('Job');

exports.findJobs = function(query) {
    return Promise.cast(mongoose.model('Job').find(query).exec());    
}


//wrap third party function with promise.
//Params, function, object reference
exports.connectDb = Promise.promisify(mongoose.connect, mongoose);

var createJob = Promise.promisify(Job.create, Job);

exports.seedJobs = function() {

        return findJobs({}).then(function(collection){
            if(collection.length === 0 ) {
                return Promise.map(jobs, function(job){
                    return createJob(job);
                });
            }
        });

};