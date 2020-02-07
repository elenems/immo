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
