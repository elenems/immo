const Busboy = require('busboy');
const fs = require('fs');
const os = require('os');
const path = require('path');
const { Storage } = require('@google-cloud/storage');
const { db } = require('../util/admin');
const { hasTag } = require('../util/functions');

const storage = new Storage();

exports.getPhotosByTag = (req, res) => {
  const tag = req.query.tag.toLowerCase();
  const items = [];
  db.collection('photos')
    .get()
    .then((photos) => {
      photos.forEach((item) => {
        if (item.data().tags.includes(tag)) {
          items.push({
            id: item.id,
            ...item.data(),
          });
        }
      });
      return res.status(200).json(items);
    })
    .catch(() => res.status(400).json({
      error: `Can't find photos with tag ${tag}`,
    }));
};

exports.getPhotos = (req, res) => {
  const items = [];
  db.collection('photos')
    .get()
    .then((photos) => {
      photos.forEach((item) => {
        items.push({
          id: item.id,
          ...item.data(),
        });
      });
      return res.status(200).json(items);
    })
    .catch(() => res.status(400).json({
      error: "Can't load photos",
    }));
};

exports.likePhoto = (req, res) => {
  const { photoId } = req.body;
  const { userId } = req.body;

  db.collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      const { favourites } = doc.data();
      favourites[photoId] = photoId;
      db.collection('users')
        .doc(userId)
        .update({
          favourites,
        });
    })
    .then(() => db
      .collection('photos')
      .doc(photoId)
      .get())
    .then((doc) => {
      const favourites = doc.data().likesCount + 1;
      db.collection('photos')
        .doc(photoId)
        .update({
          likesCount: favourites,
        });
    })
    .then(() => res.status(200).json({ message: 'Added to favourites' }))
    .catch(() => res.status(400).json({ error: "Can't add" }));
};

exports.unlikePhoto = (req, res) => {
  const { photoId } = req.body;
  const { userId } = req.body;

  db.collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      const { favourites } = doc.data();
      delete favourites[photoId];
      db.collection('users')
        .doc(userId)
        .update({
          favourites,
        });
    })
    .then(() => db
      .collection('photos')
      .doc(photoId)
      .get())
    .then((doc) => {
      const likes = doc.data().likesCount - 1;
      db.collection('photos')
        .doc(photoId)
        .update({
          likesCount: likes,
        });
    })
    .then(() => res.status(200).json({ message: 'Removed from favouites' }))
    .catch(() => {
      res.status(400).json({ error: "Can't remove" });
    });
};

exports.incrementPhotoView = (req, res) => {
  db.collection('photos')
    .doc(req.query.photoId)
    .get()
    .then((doc) => {
      db.collection('photos')
        .doc(req.query.photoId)
        .update({
          views: parseInt(doc.data().views, 10) + 1,
        });
      return res.status(200).json({ message: 'Photo views incremented' });
    })
    .catch((e) => res.status(400).json(e));
};

exports.getPhoto = (req, res) => {
  const id = req.query.photoId;
  db.collection('photos')
    .doc(id)
    .get()
    .then((doc) => res.status(200).json({
      id: doc.id,
      ...doc.data(),
    }))
    .catch((e) => res.status(500).json({ e }));
};

// eslint-disable-next-line consistent-return
exports.uploadPhoto = (req, res) => {
  const busboy = new Busboy({
    headers: req.headers,
  });
  let uploadData = null;
  let link = null;
  const errors = {};

  if (!req.query.name.length) {
    errors.titleError = 'Must not be empty';
  }

  if (Object.keys(errors).length > 0) {
    return res.status(400).json({ errors });
  }

  const photoInfo = req.query;

  photoInfo.likesCount = 0;
  photoInfo.views = 0;
  photoInfo.date = new Date().toUTCString();

  // eslint-disable-next-line consistent-return
  busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
    if (mimetype !== 'image/jpeg' && mimetype !== 'image/png') {
      return res.status(400).json({ error: 'Wrong file type submitted' });
    }

    link = new Date().getTime() + filename;
    const filepath = path.join(os.tmpdir(), link);
    uploadData = { file: filepath, type: mimetype };
    file.pipe(fs.createWriteStream(filepath));
  });

  busboy.on('finish', () => {
    const bucketName = 'immo-764e3.appspot.com';
    storage
      .bucket(bucketName)
      .upload(uploadData.file, {
        uploadType: 'media',
        metadata: {
          metadata: {
            contentType: uploadData.type,
          },
        },
      })
      .then(() => {
        link = `https://firebasestorage.googleapis.com/v0/b/${bucketName}/photos/o/${link}?alt=media`;
        db.collection('photos').add({ image: link, ...photoInfo });
      })
      .then(() => res.status(200).json({
        message: 'Photo has been added successfuly',
      }))
      .catch(() => res
        .status(500)
        .json({ error: 'Something went wrong, please try again later' }));
  });
  busboy.end(req.rawBody);
};

exports.removePhoto = (req, res) => {
  db.collection('photos')
    .doc(req.body.photoId)
    .delete()
    .then(() => res.status(200).json({ message: 'Photo has been removed successfuly' }))
    .catch(() => res
      .status(400)
      .json({ error: 'Error while removing the photo' }));
};

exports.getUserPhotos = (req, res) => {
  const photos = [];
  db.collection('photos')
    .where('owner', '==', req.query.userId)
    .get()
    .then((snapshot) => {
      if (snapshot.empty) {
        return res.status(400).json({ error: 'Not found' });
      }
      snapshot.forEach((doc) => {
        photos.push({
          id: doc.id,
          ...doc.data(),
        });
      });

      return res.status(200).json({ photos });
    })
    .catch((e) => res.status(400).json({ error: e }));
};

exports.getFavouritePhotos = (req, res) => {
  const { userId } = req.query;
  let userFavourites = null;
  const likedPhotos = [];
  db.collection('users')
    .doc(userId)
    .get()
    .then((doc) => {
      userFavourites = doc.data().favourites;
      return db.collection('photos').get();
    })
    .then((photos) => {
      if (userFavourites !== null) {
        photos.forEach((item) => {
          if (item.id in userFavourites) {
            likedPhotos.push({ id: item.id, ...item.data() });
          }
        });
      }
      return res.status(200).json({ likedPhotos });
    })
    .catch(() => res.status(400).json({ error: 'Error getting favourites' }));
};

exports.getRelatedPhotos = (req, res) => {
  const tags = req.query.tags.split(',');
  const relatedPhotos = [];
  db.collection('photos')
    .get()
    .then((photos) => {
      photos.forEach((item) => {
        const stringifiedTags = item.data().tags.toString();
        if (hasTag(stringifiedTags, tags)) {
          relatedPhotos.push({
            id: item.id,
            ...item.data(),
          });
        }
      });

      return res.status(200).json({ related: relatedPhotos.slice(0, 10) });
    })
    .catch(() => res.status(403).json({ error: "Can't load related photos" }));
};
