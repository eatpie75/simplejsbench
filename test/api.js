var expect = require('../node_modules/chai/chai').expect;
var assert = require('../node_modules/chai/chai').assert;
var request = require('request');

// process.env.PORT = 3000;
process.env.MONGO_URI = 'mongodb://localhost:27017/test';
process.env.LOGGING = 'none';

var db = require('../models');
var server = require('../bin/www');

describe('Api tests', function() {
  before(function(done) {
    db.Test.remove({}).then(function(){done();});
    server.listen(3000);
  });

  after(function(done) {
    db.Test.remove({}).then(function(){done();});
  });

  it('should add tests', function(done) {
    request({
      'method':'POST',
      'uri':'http://localhost:3000/api/1/',
      'json':{
        'name':'test test',
        'creator':'test@test.com',
        'test':'function(){a();}',
        'versions':[
          'var a=function(){};',
          'var a=function(){return;};',
        ]
      }
    }, function() {
      db.Test.findOne({'name':'test test'}).then(function(test) {
        expect(test.creator).to.equal('test@test.com');
        done();
      }, function(err) {
        assert(err);
        done();
      });
    });
  });

  it('should retrieve tests', function(done) {
    request({'uri':'http://localhost:3000/api/1/', 'json':true}, function(err, res, body) {
      expect(body[0].slug).to.equal('test-test');
      expect(body[0].versions.length).to.equal(2);
      done();
    });
  });
});
