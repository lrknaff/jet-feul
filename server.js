const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const md5 = require('md5');
const shortid = require('shortid');
const moment = require('moment');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const environment = process.env.NODE_ENV || 'development';
const configuration = require('./knexfile')[environment];
const database = require('knex')(configuration);

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Jet Fuel'
app.locals.folders = []
app.locals.urls = []

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/api/folders', (request, response) => {
  database('folders').select()
          .then(function(folders) {
            response.status(200).json(folders)
          })
          .catch(function(error) {
            console.error('something wrong with db')
          })
})

app.get('/api/urls', (request, response) => {
  response.json(app.locals.urls)
})

app.post('/api/folders', (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const { folder_name } = request.body
  const id = md5(folder_name)

  const folder = { id, folder_name, created_at: new Date }
  database('folders').insert(folder)
  .then(function() {
    database('folders').select()
            .then(function(folder) {
              response.status(200).json(secrets);
            })
            .catch(function(error) {
              console.error('somethings wrong with db')
            })
  })
});

app.post('/api/urls', (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const { url, folderId } = request.body
  const id = md5(url)
  const short = 'http://fake.ly/' + shortid.generate()
  const created = moment()


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
