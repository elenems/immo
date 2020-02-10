const { db } = require('../util/admin');

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
    .catch(() =>
      res.status(400).json({
        error: `Can't find photos with tag ${tag}`,
      }),
    );
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
    .catch(() =>
      res.status(400).json({
        error: "Can't load photos",
      }),
    );
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
    .doc(req.body.photoId)
    .get()
    .then((doc) => {
      db.collection('photos')
        .doc(req.body.photoId)
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
