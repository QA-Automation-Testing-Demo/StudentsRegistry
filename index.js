const express = require('express');
const app = express();

const path = require('path');

app.get('/loaderio-e1df1fafe30772f953ca55ba5d2406ec.html', function(req, res){
  res.sendFile(path.join(__dirname, 'index.html'));
});

app.set('view engine', 'pug');
app.use(require('body-parser')
  .urlencoded({extended:true}));

const studentsController = 
  require("./controllers/students-controller");

let students = require("./models/students-model");

studentsController.setup(app, students);

let port = process.argv[2];
if (!port) port = process.env['PORT'];
if (!port) port = 8080;

app.listen(port, () => {
  console.log(`App started. Listening at http://localhost:${port}`);
})
.on('error', function(err) {
  if (err.errno === 'EADDRINUSE')
    console.error(`Port ${port} busy.`);
  else 
    throw err;
});
