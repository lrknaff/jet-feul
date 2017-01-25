

$('.add-folder-button').on('click', function(e) {
  e.preventDefault()

  console.log($('.add-folder-input').val())
  var folder = $('.add-folder-input').val()
  $.ajax({
    url: '/api/folders',
    type: 'post',
    data: {
      folder: $('.add-folder-input').val(),
      id: Date.now()
    }
  })
})
