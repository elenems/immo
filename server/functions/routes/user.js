const firebase = require('firebase');
const { db } = require('../util/admin');
require('firebase/auth');
const firebaseConfig = require('../util/config');
const {
  validateEmail,
  validatePassword,
  validateCred,
} = require('../util/validators');

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

// eslint-disable-next-line consistent-return
exports.joinUser = (req, res) => {
  const user = req.body;
  const errors = {};

  const email = validateEmail(user.email);
  const password = validatePassword(user.password);
  const firstName = validateCred(user.firstName);

  if (!email.valid) {
    errors.emailError = email.message;
  }

  if (!firstName.valid) {
    errors.firstNameError = firstName.message;
  }

  if (!password.valid) {
    errors.passwordError = password.message;
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json(errors);
  }

  let token;
  db.doc(`/users/${user.email}`)
    .get()
    .then((doc) => {
      if (doc.exists) {
        return res
          .status(400)
          .json({ emailError: 'This email is already taken' });
      }
      return firebase
        .auth()
        .createUserWithEmailAndPassword(user.email, user.password);
    })
    .then((data) => data.user.getIdToken())
    .then((idToken) => {
      token = idToken;
      return db.doc(`/users/${user.email}`).set(user);
    })
    .then(() => res.status(201).json({ token }))
    .catch((err) => {
      if (err.code === 'auth/email-already-in-use') {
        return res.status(400).json({ emailError: 'Email is already is use' });
      }
      return res.status(500).json({ message: 'Something went wrong' });
    });
};
