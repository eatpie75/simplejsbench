var slug = require('slug');

var express = require('express');
var router = express.Router();

var rejected = function(res, status) {
  status = (status === undefined) ? 400 : status;
  res.status(status).send();
};

router.get('/', function(req, res) {
  req.models.Test.get_all().then(function(data) {
    res.send(data);
  });
});

router.post('/', function(req, res) {
  var data = req.body;
  var p = req.models.Test.count({'slug':slug(data.name)});

  p.then(function(count) {
    if (count > 0) {
      return rejected(res, 409);
    } else {
      var test = new req.models.Test({
        'name':data.name,
        'creator':data.creator,
        'test':data.test,
        'versions':data.versions
      });

      test.save().then(function() {
        res.status(201).send(test.get_url());
      }, function(err) {
        console.log(err);
        return rejected(res, 400);
      });
    }
  });
});

// router.get('/:test/edit', function(req, res) {
//   req.models.Test.findOne({'slug':req.params.test}, function(err, test) {
//     if (err) {
//       res.status(500);
//       res.render('error', {
//         message: err.message,
//         error: err
//       });
//     } else {
//       res.render('test_edit', {'test':test});
//     }
//   });
// });

module.exports = router;
