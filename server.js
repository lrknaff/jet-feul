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
  database('folders').select().table('folders')
          .then(function(folders) {
            response.status(200).json(folders)
          })
          .catch(function(error) {
            console.error('something wrong with db')
          })
})

app.get('/api/urls', (request, response) => {
  database('folders').select().table('urls')
          .then(function(urls) {
            response.status(200).json(urls)
          })
          .catch(function(error) {
            console.error('something wrong with db')
          })
})

app.get('/api/urls/list', (request, response) => {
  database('folders').select().table('urls').orderBy('created_at', 'desc')
          .then(function(urls) {
            response.status(200).json(urls)
          })
          .catch(function(error) {
            console.error('something wrong with db')
          })
})

app.get('/api/urls/sort-visit', (request, response) => {
  database('folders').select().table('urls').orderBy('times_visited', 'desc')
          .then(function(urls) {
            response.status(200).json(urls)
          })
          .catch(function(error) {
            console.error('something wrong with db')
          })
})

app.get('/api/urls/sort-date', (request, response) => {
  database('folders').select().table('urls').orderBy('created_at', 'desc')
          .then(function(urls) {
            response.status(200).json(urls)
          })
          .catch(function(error) {
            console.error('something wrong with db')
          })
})

app.get('/api/urls/:id', (request, response) => {
  const { id } = request.params
  database('folders').select().table('urls').where('id', id)
          .then(function(urls) {
            response.status(200).json(urls);
          })
          .catch(function(error) {
            console.error(error)
          })
})

app.post('/api/folders', (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const { folder_name } = request.body
  const folder = { folder_name, created_at: new Date }

  database('folders').insert(folder).returning(['id', 'folder_name'])
            .then(function(payload) {
              response.status(200).json(payload[0])
            })
            .catch(function(error) {
              console.error('somethings wrong with db', error)
            })
})

app.post('/api/urls', (request, response) => {
  response.setHeader('Content-Type', 'application/json');

  const { original_url, folder_id } = request.body
  const short_url = 'http://fake.ly/' + shortid.generate()
  const url = { times_visited: 0, folder_id, short_url, original_url, created_at: new Date }

  database('folders').select().table('urls')
            .insert(url)
            .returning(['id', 'folder_id', 'short_url', 'original_url', 'times_visited'])
            .then(function(payload) {
              response.status(200).json(payload[0])
            })
            .catch(function(error) {
              console.error('somethings wrong with db', error)
            })
})

app.patch('/api/urls/:id', (request, response) => {
  const { id } = request.params
  const { times_visited, folder_id, short_url, original_url } = request.body

  database('folders').select().table('urls').where('id', id).first()
          .update({ times_visited: times_visited })
          .returning(['id', 'folder_id', 'short_url', 'original_url', 'times_visited'])
          .then(function(payload) {
            response.status(200).json( payload[0])
          })
          .catch(function(error) {
            console.error(error)
          })
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
})

module.exports = app;
