var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/simplejsbench', function (error) {
  if (error) {
    console.log(error);
  }
});

module.exports = {
  'Test':require('./test')
};
