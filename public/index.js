var $folderSection = $('.folders')

function displayFolders(jsonData) {
  $folderSection.append(`<div class="folder" id=${jsonData.id}>+ ${jsonData.folder_name}</div><button type="submit" class="add-link-button">- add link</button>`)
}

$.get('/api/folders', function(data) {
  for(var key in data) {
    if (data.hasOwnProperty(key))
    $folderSection.append(`<div class="folder" id=${data[key].id}>+ ${data[key].folder_name}</div><button type="submit" class="add-link-button">- add link</button>`)
  }
})

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

// $('.add-link-button').on('click', function(e) {
//   e.preventDefault();
//   $this.append(`<label action="/api/urls" method="post">
//     Add Link:
//     <input class="add-url-input" type="text" placeholder="Paste a link to shorten it"/>
//     <input class="add-url-button" type="submit" value="Shorten link" />
//   </label>`)
// })
