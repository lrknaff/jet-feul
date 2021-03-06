var $folderSection = $('.folders')
var $urlSection = $('.urls')

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
  $(`.folder#${jsonData.folder_id} ul`).append(`
    <li>
      <div class="details">
        <p>${jsonData.original_url}</p>
        <a id=${jsonData.id} onClick="countVisited( ${jsonData.id})">${jsonData.short_url}</a>
        <p>Created at: ${jsonData.created_at}</p>
        <p class="visits">Times visited: ${jsonData.times_visited}</p>
      </div>
    </li>
  `)
  displayUrlList(jsonData);
}

function displayUrlList(jsonData) {
  $urlSection.append(`
    <li>
      <div class="details">
        <p>${jsonData.original_url}</p>
        <a id=${jsonData.id} onClick="countVisited( ${jsonData.id})">${jsonData.short_url}</a>
        <p>Created at: ${jsonData.created_at}</p>
        <p class="visits">Times visited: ${jsonData.times_visited}</p>
      </div>
    </li>
  `)
}

function replaceCount(jsonData) {
  $(`a#${jsonData.id}`).siblings('.visits').replaceWith(`
    <p class="visits">Times visited: ${jsonData.times_visited}</p>
    `)
}

function countVisited(id) {
  $.get(`/api/urls/${id}`, function(data) {
    var addCount = data[0].times_visited + 1

    $.ajax({
      url: `/api/urls/${id}`,
      type: 'patch',
      data: {
        times_visited: addCount
      },
      success: replaceCount
    })

   window.location.href = `http://${data[0].original_url}`
  })
}

function returnAscendingList(data, key) {
  $('.urls').append(`
    <li>
      <div class="details">
        <p>${data[key].original_url}</p>
        <a id=${data[key].id} onClick="countVisited( ${data[key].id})">${data[key].short_url}</a>
        <p>Created at: ${data[key].created_at}</p>
        <p class="visits">Times visited: ${data[key].times_visited}</p>
      </div>
    </li>
  `)
}

function returnDescendingList(data, key) {
  $('.urls').prepend(`
    <li>
      <div class="details">
        <p>${data[key].original_url}</p>
        <a id=${data[key].id} onClick="countVisited( ${data[key].id})">${data[key].short_url}</a>
        <p>Created at: ${data[key].created_at}</p>
        <p class="visits">Times visited: ${data[key].times_visited}</p>
      </div>
    </li>
  `)
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
  data.forEach(function(url) {
    var folderId = url.folder_id
    $(`.folder#${folderId} ul`).append(`
      <li>
        <div class="details">
          <p>${url.original_url}</p>
          <a id=${url.id} onClick="countVisited( ${url.id})">${url.short_url}</a>
          <p>Created at: ${url.created_at}</p>
          <p class="visits">Times visited: ${url.times_visited}</p>
        </div>
      </li>
    `)
  })
})

$.get('/api/urls/list', function(data) {
  for(var key in data) {
    if (data.hasOwnProperty(key))
    returnAscendingList(data, key)
  }
})

$('.sort-url-date-button').on('click', function(e) {
  e.preventDefault()
  $('.urls').replaceWith(`<ul class="urls"></ul>`)
  $(this).toggleClass('ascend')

  if ($(this).attr('class') === "sort-url-date-button ascend") {
    $.get('/api/urls/sort-date', function(data) {
      for(var key in data) {
        if (data.hasOwnProperty(key))
        returnAscendingList(data, key)
        }
      })
  } else {
    $.get('/api/urls/sort-date', function(data) {
      for(var key in data) {
        if (data.hasOwnProperty(key))
          returnDescendingList(data, key)
        }
      })
    }
})

$('.sort-url-visit-button').on('click', function(e) {
  e.preventDefault()
  $('.urls').replaceWith(`<ul class="urls"></ul>`)
  $(this).toggleClass('ascend')

  if ($(this).attr('class') === "sort-url-visit-button ascend") {
    $.get('/api/urls/sort-visit', function(data) {
      for(var key in data) {
        if (data.hasOwnProperty(key))
        returnAscendingList(data, key)
        }
      })
  } else {
    $.get('/api/urls/sort-visit', function(data) {
      for(var key in data) {
        if (data.hasOwnProperty(key))
          returnDescendingList(data, key)
        }
      })
    }
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

  $('.add-folder-input').val('')
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

  $('.add-url-input').val('')
})

$('.filter-input').on('keyup', function(){
    var filter = $(this).val();

    $('.urls li').each(function() {
      if($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).fadeOut();
      }
      else {
        $(this).fadeIn();
      }
    });
});
