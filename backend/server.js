const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');

const UserModel = require('./models/model');

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));


app.use((req, res, next) => {
  console.log('new request made:')
  console.log('host:', req.hostname)
  console.log('path:', req.path)
  console.log('method:', req.method)
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.use('/api/v1', routes);

// Handle errors.
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(5000, () => {
  console.log('Server started.')
});
