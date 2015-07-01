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

  return data

submit = ()->
  $.post('http://127.0.0.1:3000/api/1/add', serialize(), (data)->
    window.location = data
  )

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
