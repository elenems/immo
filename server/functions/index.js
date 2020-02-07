const functions = require('firebase-functions');
const cors = require('cors');
const app = require('express')();

app.use(cors());
const { getUser, joinUser } = require('./routes/user');
const { getPhotosByTag, getPhotos } = require('./routes/photo');

// Users
app.get('/getUser', getUser);
app.post('/join', joinUser);

// Photos
app.get('/getPhotosByTag', getPhotosByTag);
app.get('/getPhotos', getPhotos);

exports.api = functions.region('europe-west2').https.onRequest(app);
