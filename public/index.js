var $folderSection = $('.folders')
var $urlSection = $('.urls')

$('.add-folder-button').on('click', function(e) {
  e.preventDefault()
  var folder = $('.add-folder-input').val()

  $.ajax({
    url: '/api/folders',
    type: 'post',
    data: {
      folder: folder
    },
    success: displayFolders
  })
})

function displayFolders(jsonData) {
  console.log(jsonData)
  $folderSection.append(`<div class="folder">+${jsonData.folder}</div>`)
}

$.get('/api/folders', function(data) {
  for(var key in data) {
    if (data.hasOwnProperty(key))
    $folderSection.append(`<div class="folder">+${data[key].folder}</div>`)
  }
})

$('.add-url-button').on('click', function(e) {
  e.preventDefault()
  var url = $('.add-url-input').val()

  $.ajax({
    url: '/api/urls',
    type: 'post',
    data: {
      url: url
    },
    success: displayFolders
  })
})

function displayFolders(jsonData) {
  console.log(jsonData)
  $urlSection.append(`<div class="url">+${jsonData.url}</div>`)
}

$.get('/api/urls', function(data) {
  for(var key in data) {
    if (data.hasOwnProperty(key))
    $urlSection.append(`<div class="url">+${data[key].url}</div>`)
  }
})
