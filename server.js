const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const md5 = require('md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Jet Fuel'
app.locals.folders = []
app.locals.urls = []

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders)
})

app.get('/api/urls', (request, response) => {
  response.json(app.locals.urls)
})

app.post('/api/folders', (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const { folder } = request.body
  const id = md5(folder)

  if (!folder) {
   return response.status(422).send({
     error: 'No folder property provided'
   });
 }

  app.locals.folders.push({folder_name: folder, id: id})

  response.status(201).json({
      folder_name: folder,
      id: id
   })
});

app.post('/api/urls', (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const { url, folderId } = request.body
  const id = md5(url)

  if (!url) {
   return response.status(422).send({
     error: 'No url property provided'
   });
 }

  app.locals.urls.push({original_url: url, id: id, folder_id: folderId})

  response.status(201).json({
      original_url: url,
      id: id,
      folder_id: folderId
   })
});

app.get('/api/folders/:id', (request, response) => {
  const { id } = request.params;
  const folder = app.locals.folders.filter(function(url) { return url.id === id })

  if(!folder) { return response.sendStatus(404); }

  response.json({ folder })
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
