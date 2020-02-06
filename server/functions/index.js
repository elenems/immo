const functions = require('firebase-functions');
const cors = require('cors');
const app = require('express')();

app.use(cors());
const { getUser } = require('./routes/user');
const { getPhotosByTag } = require('./routes/photo');

// Users
app.get('/getUser', getUser);

// Photos
app.get('/getPhotosByTag', getPhotosByTag);

exports.api = functions
  .region('europe-west2')
  .https.onRequest(app);
