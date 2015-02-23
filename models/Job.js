var mongoose=require("mongoose");
var Promise = require("bluebird");

var jobSchema=mongoose.Schema({
   title:{type:String},
   description:{type:String}
});

var jobs = [
    {title:'Cook', description:'You will make bagels'},
    {title:'Waiter', description:'You will be putting food on peoples tables'},
    {title:'Programmer', description:'You will create universes - many of which will not be visisted.  Ever'},
    {title:'Axe Maker', description:'We need many axes made..  So many..'}
    ];
    
var Job = mongoose.model('Job', jobSchema);

function findJobs(query) {
    return Promise.cast(mongoose.model('Job').find(query).exec());
}

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