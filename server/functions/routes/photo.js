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
      favourites.photoId = photoId;
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
    .then(() => res.status(200).json({ message: 'Liked successfuly' }))
    .catch(() => res.status(400).json({ error: "Can't like" }));
};
