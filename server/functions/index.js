const functions = require('firebase-functions');
const cors = require('cors');
const app = require('express')();

app.use(cors());
const { getUser, joinUser, loginUser } = require('./routes/user');
const {
  getPhotosByTag,
  getPhotos,
  likePhoto,
  unlikePhoto,
  incrementPhotoView,
  getPhoto,
} = require('./routes/photo');

// Users
app.get('/getUser', getUser);
app.post('/join', joinUser);
app.post('/login', loginUser);

// Photos
app.get('/getPhotosByTag', getPhotosByTag);
app.get('/getPhotos', getPhotos);
app.post('/likePhoto', likePhoto);
app.post('/unlikePhoto', unlikePhoto);
app.post('/addView', incrementPhotoView);
app.get('/getPhoto', getPhoto);

exports.api = functions.region('europe-west2').https.onRequest(app);
