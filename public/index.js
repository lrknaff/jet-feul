var $folderSection = $('.folders')

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
  $folderSection.append(`<div class="folder" id=${jsonData.id}>+ ${jsonData.folder_name}</div><button type="submit">- add link</button>`)
}

$.get('/api/folders', function(data) {
  for(var key in data) {
    if (data.hasOwnProperty(key))
    $folderSection.append(`<div class="folder" id=${data[key].id}>+ ${data[key].folder_name}</div><button type="submit">- add link</button>`)
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
    // success: displayUrl
  })
})
