const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const viewsRouter = require('./routes/Views');
const usersRouter = require('./routes/Users');
const articlesRouter = require('./routes/Articles');
const shareRouter = require('./routes/Share');


const app = express();

app.use(bodyParser.json());
app.use(express.static(__dirname + '/../client/dist'));

app.use('/api/views', viewsRouter);
app.use('/api/users', usersRouter);
app.use('/api/articles', articlesRouter);
app.use('/api/share', shareRouter);

// serve react app for all paths
// react router handles internally
app.get('/*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

let port = process.env.PORT || 3000;

app.listen(port, () => {
  console.log('Server live');
});