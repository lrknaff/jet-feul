const express = require('express');
const app = express();
const path = require('path');
const bodyParser = require('body-parser');
const md5 = require('md5');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.set('port', process.env.PORT || 3000);

app.locals.title = 'Jet Fuel'
app.locals.folders = {}

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders)
})

app.post('/api/folders', (request, response) => {
  const { folder } = request.body
  const id = md5(folder)

  if (!folder) {
   return response.status(422).send({
     error: 'No folder property provided'
   });
 }

  app.locals.folders[id] = folder

  response.status(201).json({
      folder: folder,
      id: id
   })
});

app.get('/api/folders/:id', (request, response) => {
  const { id } = request.params;
  const folder = app.locals.folders[id]

  if(!folder) { return response.sendStatus(404); }

  response.json({ id, folder })
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
