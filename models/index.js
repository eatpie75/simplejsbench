var mongoose = require('mongoose');

var uri = process.env.MONGO_URI || 'mongodb://localhost:27017/simplejsbench';

mongoose.connect(uri, function (error) {
  if (error) {
    console.log(error);
  }
});

module.exports = {
  'Test':require('./test')
};
