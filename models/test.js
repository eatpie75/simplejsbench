var mongoose = require('mongoose');
var slug = require('slug');

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
  console.log(this);
  return '/'+this.slug;
};

var Test = mongoose.model('Test', TestSchema);

module.exports = Test;
