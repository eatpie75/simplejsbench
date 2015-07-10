var mongoose = require('mongoose');
var slug = require('slug');
var Promise = require('promise');

var Test;

var TestSchema = new mongoose.Schema({
  'name':{'type':String, 'required':true},
  'slug':{'type':String, 'required':true},
  'creator':{'type':String, 'required':true},
  'date_created':{'type':Date, 'default':Date.now},
  'versions':[],
  'test':{'type':String, 'required':true},
});

TestSchema.pre('validate', function(next) {
  if (this.slug === undefined) {
    this.slug = slug(this.name);
  }
  next();
});

TestSchema.methods.get_url = function() {
  return '/' + this.slug;
};

TestSchema.statics.get_all = function() {
  return new Promise(function(resolve, reject) {
    Test.find().select('-_id name slug date_created versions test')
      .then(resolve, reject);
  });
};

Test = mongoose.model('Test', TestSchema);

module.exports = Test;
