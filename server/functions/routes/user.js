const firebase = require('firebase');
const { db } = require('../util/admin');
require('firebase/auth');
const firebaseConfig = require('../util/config');

firebase.initializeApp(firebaseConfig);

exports.getUser = (req, res) => {
  const id = req.query.userId;
  db.collection('users')
    .doc(id)
    .get()
    .then((doc) => {
      if (!doc.exists) {
        return res.status(404).json({ noSuchDocError: 'No such document' });
      }
      return res.status(200).json({ id: doc.id, ...doc.data() });
    })
    .catch((err) => res.status(403).json({ err }));
};
