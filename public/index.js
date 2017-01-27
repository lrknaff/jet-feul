var $folderSection = $('.folders')

function displayFolders(jsonData) {
  $folderSection.append(`
    <div class="folder" id=${jsonData.id}>
      <h2>+ ${jsonData.folder_name}</h2>
      <ul></ul>
    </div>
  `)
  $('.folder-dropdown').append(`
    <option id=${jsonData.id}>${jsonData.folder_name}</option>
    `)
}

function displayUrl(jsonData) {
  console.log(jsonData)
  $(`.folder#${jsonData.folder_id} ul`).append(`
    <li>
      <div class="details">
        <a id=${jsonData.id} target="_blank" href="http://${url.original_url} onClick="countVisited(${jsonData.times_visited}, ${jsonData.id})">${jsonData.short_url}</a>
        <p>Created at: ${jsonData.created_at}</p>
        <p>Times visited: ${jsonData.times_visited}</p>
      </div>
    </li>
  `)
}

function countVisited(count, id) {
  var addCount = count + 1

  $.ajax({
    url: `/api/urls/${id}`,
    type: 'put',
    data: {
      times_visited: addCount
    },
    // success: displayUrls
  })
}

$.get('/api/folders', function(data) {
  for(var key in data) {
    if (data.hasOwnProperty(key))
    $folderSection.append(`
      <div class="folder" id=${data[key].id}>
        <h2>+ ${data[key].folder_name}</h2>
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
      <li>
        <div class="details">
          <a id=${url.id} href="#" onClick="countVisited(${url.times_visited}, ${url.id})">${url.short_url}</a>
          <p>Created at: ${url.created_at}</p>
          <p>Times visited: ${url.times_visited}</p>
        </div>
      </li>
    `)
  })
})

// target="_blank" href="http://${url.original_url}"

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
      original_url: url,
      folder_id: folderId,
    },
    success: displayUrl
  })
})
