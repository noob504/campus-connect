const express = require('express');
const mongoose = require('mongoose');
const passport = require('passport');
const bodyParser = require('body-parser');
const cors = require('cors')

console.log(process.env.S3_ACCESS_ID)
console.log(process.env.S3_ACCESS_KEY)
console.log(process.env.MONGO_URI)

mongoose.connect(process.env.MONGO_URI);
mongoose.connection.on('error', error => console.log(error));
mongoose.Promise = global.Promise;

require('./auth/auth');

const routes = require('./routes/routes');
const secureRoute = require('./routes/secure-routes');

const app = express();

app.use(bodyParser.json());


app.use(cors({
  origin: ['http://example.com', 'http://localhost:5273']
}));

app.use((req, res, next) => {
  console.log('host:', req.hostname)
  console.log('path:', req.path)
  console.log('method:', req.method)
  next()
})

app.get('/', (req, res) => {
  res.send('Hello World!!')
})

app.use('/api/v1', routes);

// Plug in the JWT strategy as a middleware so only verified users can access this route.
app.use('/user', passport.authenticate('jwt', { session: false }), secureRoute);

// Handle errors.
app.use(function(err, req, res, next) {
  res.status(err.status || 500);
  res.json({ error: err });
});

app.listen(5000, () => {
  console.log('Server started.')
});
