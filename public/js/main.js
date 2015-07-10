(function() {
  var run_test, serialize, submit,
    indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

  serialize = function() {
    var data;
    data = {
      'name': $('[name="test-name"]').val(),
      'creator': $('[name="test-creator').val(),
      'test': $('[name="test-test"]').val(),
      'versions': []
    };
    $('.version-form').each(function(i, e) {
      e = $(e);
      return data.versions.push({
        'title': e.children('[name="test-version-name"]').val(),
        'code': e.children('[name="test-version"]').val()
      });
    });
    return JSON.stringify(data);
  };

  submit = function() {
    return $.ajax({
      'url': 'http://127.0.0.1:3000/api/1/',
      'method': 'POST',
      'data': serialize(),
      'contentType': 'application/json',
      'success': function(data) {
        return window.location = data;
      }
    });
  };

  run_test = function() {
    var test_fn;
    window.suite = new Benchmark.Suite('all', {
      'onCycle': function(e) {
        $('.status').text(e.target.name + ": " + e.target.cycles);
      },
      'onComplete': function(e) {
        var fastest, slowest;
        $('.status').text('');
        fastest = this.filter('fastest');
        slowest = this.filter('slowest');
        suite.forEach(function(bench) {
          var $el, num_samples, ref, ref1, text;
          $el = $('#result-' + bench.name);
          num_samples = bench.stats.sample.length;
          text = ["completed " + (Benchmark.formatNumber(bench.count)) + " times in " + bench.times.elapsed + " seconds", "<br>" + num_samples + (num_samples === 1 ? '' : 's') + " samples", '<br>' + Math.round((1 - bench.hz / fastest[0].hz) * 100) + '% slower'];
          if (ref = bench.name, indexOf.call(fastest.pluck('name'), ref) >= 0) {
            $el.addClass('fastest');
            text[2] = '<br>FASTEST';
          } else if (ref1 = bench.name, indexOf.call(slowest.pluck('name'), ref1) >= 0) {
            $el.addClass('slowest');
            text.push('<br>SLOWEST');
          }
          return $el.html(text.join(''));
        });
        $('#button-test-run').prop('disabled', false);
      }
    });
    test_fn = $('.test').text();
    $('.snippet').each(function(i, e) {
      e = $(e);
      suite.add(e.data('name'), e.text() + test_fn);
    });
    suite.run();
  };

  $(document).ready(function() {
    $('#button-test-add').on('click', function(e) {
      var clone;
      clone = $('.version-form:last').clone();
      clone.children().val('');
      return $('.version-form:last').after('<hr/>', clone);
    });
    $('#button-test-submit').on('click', function() {
      return submit();
    });
    $('#button-test-run').on('click', function() {
      $(this).prop('disabled', true);
      return run_test();
    });
    return $('#test-form').on('submit', function(e) {
      e.preventDefault();
      return submit();
    });
  });

}).call(this);
