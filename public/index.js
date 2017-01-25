var $folderSection = $('.folders')

function displayFolders(jsonData) {
  $folderSection.append(`
    <div class="folder" id=${jsonData.id}>
      <p>+ ${jsonData.folder_name}</p>
    </div>
  `)
  $('.folder-dropdown').append(`
    <option id=${jsonData.id}>${jsonData.folder_name}</option>
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
    $('.folder-dropdown').append(`
      <option id=${data[key].id}>${data[key].folder_name}</option>
      `)
  }
})

// $.get('/api/urls', function(data) {
//     $folderSection.append(`
//       <div class="folder" id=${data[key].id}>
//         <p>+ ${data[key].folder_name}</p>
//       </div>
//     `)
// })

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
  var folderId = $('option:selected').attr('id')

  console.log(folderId)

  $.ajax({
    url: '/api/urls',
    type: 'post',
    data: {
      url: url,
      folderId: folderId
    },
    // success: displayUrl
  })
})
