var mongoose = require('mongoose');

var TestSchema = new mongoose.Schema({
  'name':String,
  'slug':String,
  'creator':String,
  'date_created':{'type':Date, 'default':Date.now},
  'versions':[],
  'test':String,
});

TestSchema.methods.get_url = function() {
  console.log(this);
  return '/'+this.slug;
};

var Test = mongoose.model('Test', TestSchema);

module.exports = Test;
