serialize = ()->
  data = {
    'name':$('[name="test-name"]').val()
    'creator':$('[name="test-creator').val()
    'test':$('[name="test-test"]').val()
    'versions':[]
  }
  $('.version-form').each((i, e)->
    e=$(e)
    data.versions.push({
      'title':e.children('[name="test-version-name"]').val()
      'code':e.children('[name="test-version"]').val()
    })
  )

  return JSON.stringify(data)

submit = ()->
  $.ajax({
    'url':'http://127.0.0.1:3000/api/1/add'
    'method':'POST'
    'data':serialize()
    'contentType':'application/json'
    'success': (data)->
      window.location = data
  })

run_test = ()->
  window.suite = new Benchmark.Suite('all', {
    'onCycle':(e)->
      $('.status').text("#{e.target.name}: #{e.target.cycles}")
      return
    'onComplete':(e)->
      $('.status').text('')
      fastest = @filter('fastest')
      slowest = @filter('slowest')

      suite.forEach((bench)->
        $el = $('#result-'+bench.name)
        num_samples = bench.stats.sample.length
        text=[
          "completed #{Benchmark.formatNumber(bench.count)} times in #{bench.times.elapsed} seconds",
          "<br>#{num_samples}#{(if num_samples == 1 then '' else 's')} samples",
          '<br>' + Math.round((1 - bench.hz / fastest[0].hz) * 100) + '% slower'
        ]
        if bench.name in fastest.pluck('name')
          $el.addClass('fastest')
          text[2] = '<br>FASTEST'
        else if bench.name in slowest.pluck('name')
          $el.addClass('slowest')
          text.push('<br>SLOWEST')
        $el.html(text.join(''))
      )

      $('#button-test-run').prop('disabled', false)
      return
  })

  test_fn = $('.test').text()

  $('.snippet').each((i, e)->
    e=$(e)
    suite.add(e.data('name'), e.text()+test_fn)
    return
  )

  suite.run()
  return

$(document).ready(()->
  $('#button-test-add').on('click', (e)->
    clone = $('.version-form:last').clone()
    clone.children().val('')
    $('.version-form:last').after('<hr/>', clone)
  )
  $('#button-test-submit').on('click', ()->
    submit()
  )
  $('#button-test-run').on('click', ()->
    $(@).prop('disabled', true)
    run_test()
  )
  $('#test-form').on('submit', (e)->
    e.preventDefault()
    submit()
  )
)
