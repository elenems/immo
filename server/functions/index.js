const functions = require('firebase-functions');
const cors = require('cors');
const app = require('express')();
app.use(cors());

const { getUser } = require('./routes/user');

// Users
app.get('/getUser', getUser);

exports.api = functions.region('europe-west2').https.onRequest(app);
