var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
  req.models.Test.find(function(err, tests) {
    if (err) {console.error(err);}

    res.render('index', { 'tests':tests });
  });
});

router.get('/:test', function(req, res) {
  req.models.Test.findOne({'slug':req.params.test}, function(err, test) {
    if (err) {
      res.status(500);
      res.render('error', {
        message: err.message,
        error: err
      });
    } else {
      res.render('test', {'test':test});
    }
  });
});

module.exports = router;
