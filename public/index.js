var $folderSection = $('.folders')

function displayFolders(jsonData) {
  $folderSection.append(`
    <div class="folder" id=${jsonData.id}>
      <p>+ ${jsonData.folder_name}</p>
    </div>
  `)
  $('.folder-dropdown').append(`
    <option>${jsonData.folder_name}</option>
    `)
}

$.get('/api/folders', function(data) {
  for(var key in data) {
    if (data.hasOwnProperty(key))
    $folderSection.append(`
      <div class="folder" id=${data[key].id}>
        <p>+ ${data[key].folder_name}</p>
      </div>
    `)
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
