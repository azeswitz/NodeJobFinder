var mongoose = require('mongoose');
var Promise = require("bluebird");

var Job = mongoose.model('Job');

var findJobs = function(query) {
    return Promise.cast(mongoose.model('Job').find(query).exec());    
}

exports.findJobs = findJobs;

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

var jobs = [
    {title:'Cook', description:'You will make bagels'},
    {title:'Waiter', description:'You will be putting food on peoples tables'},
    {title:'Programmer', description:'You will create universes - many of which will not be visisted.  Ever'},
    {title:'Axe Maker', description:'We need many axes made..  So many..'}
    ];