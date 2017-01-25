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
  console.log(jsonData)
  $folderSection.append(`<div class="folder">+${jsonData.folder}</div>`)
}

$.get('/api/folders', function(data) {
  for(var key in data) {
    if (data.hasOwnProperty(key))
    $folderSection.append(`<div class="folder">+${data[key].folder}</div>`)
  }
})
