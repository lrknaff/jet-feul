var $folderSection = $('.folders')

function displayFolders(jsonData) {
  console.log(jsonData)
  $folderSection.append(`
    <div class="folder" id=${jsonData.id}>
      <p>+ ${jsonData.folder_name}</p>
      <ul></ul>
    </div>
  `)
  $('.folder-dropdown').append(`
    <option id=${jsonData.id}>${jsonData.folder_name}</option>
    `)
}

function displayUrl(jsonData) {
  $(`.folder#${jsonData.folder_id} ul`).append(`
    <li><a target="_blank" href="http://${jsonData.original_url}">${jsonData.short_url}</a></li>
  `)
}

$.get('/api/folders', function(data) {
  for(var key in data) {
    if (data.hasOwnProperty(key))
    $folderSection.append(`
      <div class="folder" id=${data[key].id}>
        <p>+ ${data[key].folder_name}</p>
        <ul></ul>
      </div>
    `)
    $('.folder-dropdown').append(`
      <option id=${data[key].id}>${data[key].folder_name}</option>
      `)
  }
})

$.get('/api/urls', function(data) {
  let urlData = data
  data.forEach(function(url) {
    var folderId = url.folder_id
    $(`.folder#${folderId} ul`).append(`
      <li><a target="_blank" href="http://${url.original_url}">${url.short_url}</a></li>
    `)
  })
})

$('.add-folder-button').on('click', function(e) {
  e.preventDefault()
  var folderName = $('.add-folder-input').val()

  $.ajax({
    url: '/api/folders',
    type: 'post',
    data: {
      folder_name: folderName
    },
    success: displayFolders
  })
})

$('.add-url-button').on('click', function(e) {
  e.preventDefault()
  var url = $('.add-url-input').val()
  var folderId = $('option:selected').attr('id')

  $.ajax({
    url: '/api/urls',
    type: 'post',
    data: {
      url: url,
      folderId: folderId
    },
    success: displayUrl
  })
})
