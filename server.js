const express = require('express');
const app = express();
const path = require('path');

app.set('port', process.env.PORT || 3000);
app.locals.folders = {
  folder1: "Lacey's Folder",
  folder2: "Dale's Folder"
}

app.use('/', express.static(path.join(__dirname, 'public')));

app.get('/api/folders', (request, response) => {
  response.json(app.locals.folders)
})


app.listen(app.get('port'), () => {
  console.log(`${app.locals.title} is running on ${app.get('port')}.`);
});
