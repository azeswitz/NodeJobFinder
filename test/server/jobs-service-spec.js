var express = require("express");
var app = express();
var expect = require("chai").expect;
var request = require("supertest");
var Promise = require("bluebird");

var dataSavedJob;

var db = {
   findJobs: function(){
      return new Promise( function(resolve, reject) {
         resolve(["hi"]);
      });
   },
   saveJob: function(job) {
      dataSavedJob=job;
   }
};

var jobService = require("../../jobs-service")(db, app);

var newJob = {title:'Cook', description:'You will make bagels'};

describe("service get jobs", function() {
   it("get should return a json list of jobs", function(done){
   request(app).get('/api/jobs')
   .expect('Content-Type', /json/)
   .end(function(err, res){
      expect(res.body).to.be.a('Array');
      done();
      });
   });
});

describe("service save jobs", function() {
   it("should validate that title is greater than 4 characeters");
   /*
   , function(done){
      request(app).post('/api/jobs').send(newJob).end(function(err, res) {
         expect(dataSavedJob.title.length).to.be.at.least(4);
         done();
      });  
   }
   */

   it("should valicate that title is less than 40 characters");
   it("should validate that description is greater than 4 characeters");
   it("should valicate that description is less than 250 characters");
   

   
   it("should pass the job to the database save", function(done){
       request(app).post('/api/jobs').send(newJob).end(function(err, res) {
           expect(dataSavedJob).to.deep.equal(newJob);
           done();
       });
       
   });
   it("should return a status of 200 to the front end if the database saved");
   it("should return a job with an id");
   it("should return an error if the database failed");
});