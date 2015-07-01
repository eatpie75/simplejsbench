window.serialize = ()->
  data = {
    'name':$('[name="test-name"]').val()
    'creator':$('[name="test-creator').val()
    'test':$('[name="test-test"]').val()
    'versions':[]
  }
  $('.version-form').each((i, e)->
    e=$(e)
    data.versions.push({
      'name':e.children('[name="test-version-name"]').val()
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

window.b = ()->
  suite = new Benchmark.Suite('all')

  test_fn = $('.test').text()

  $('.snippet').each((i, e)->
    e=$(e)
    suite.add(e.data('name'), e.text()+test_fn)
  )
  suite.on('complete', ()->
    # debugger
    window.r = @
  )
  suite.run({'queued':true})

$(document).ready(()->
  $('#button-test-add').on('click', (e)->
    clone = $('.version-form:last').clone()
    clone.children().val('')
    $('.version-form:last').after('<hr/>', clone)
  )
  $('#button-test-submit').on('click', ()->
    submit()
  )
  $('#test-form').on('submit', (e)->
    e.preventDefault()
    console.log('?!')
    submit()
  )
)
