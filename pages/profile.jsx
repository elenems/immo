import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import { connect } from 'react-redux';
import Header from '../shared/Header/index';
import Card from '../ui_components/Card/index';
import Controls from '../components/ProfilePage/Controls/index';
import PhotosSection from '../components/ProfilePage/PhotosSection/index';

async function fetchPhotos(userId) {
  const API = process.env.REACT_APP_API;
  const urlsToFetch = [
    `${API}/getUserPhotos?userId=${userId}`,
    `${API}/getFavouritePhotos?userId=${userId}`,
  ];
  let userPhotos = null;
  let favouritePhotos = null;
  await Promise.all(urlsToFetch.map((u) => fetch(u)))
    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then((objects) => {
      [{ photos: userPhotos }, { likedPhotos: favouritePhotos }] = objects;
    });
  return { userPhotos, favouritePhotos };
}

function Profile({ userPhotos, favouritePhotos, userId }) {
  const [photos, setPhotos] = useState(userPhotos || []);
  const [favourites, setFavourites] = useState(favouritePhotos || []);
  const [loading, setLoading] = useState(!userId);// false
  useEffect(() => {
    if (userId && (!userPhotos || !favouritePhotos)) {
      (async () => {
        const {
          userPhotos: fetchedPhotos,
          favouritePhotos: fetchedFavourites,
        } = await fetchPhotos(userId);
        setPhotos(fetchedPhotos);
        setFavourites(fetchedFavourites);
        setLoading(false);
      })();
    }
  }, [userId, userPhotos, favouritePhotos]);
  return (
    <div>
      <Header />
      <Card />
      <div className="container">
        <Controls loading={loading} />
        <PhotosSection loading={loading} userPhotos={photos} favouritePhotos={favourites} />
      </div>
      <style jsx>
        {`
          .container {
            margin-top: 80px;
            display: flex;
            justify-content: space-between;
          }
        `}
      </style>
    </div>
  );
}

Profile.getInitialProps = async (context) => {
  const userId = context.ctx.store.getState().auth.user.id;
  if (userId) {
    const { userPhotos, favouritePhotos } = await fetchPhotos(userId);
    return { userPhotos, favouritePhotos };
  }
  return { userPhotos: false, favouritePhotos: false };
};

Profile.propTypes = {
  userPhotos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool]).isRequired,
  favouritePhotos: PropTypes.oneOfType([PropTypes.array, PropTypes.bool])
    .isRequired,
  userId: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => ({ userId: state.auth.user.id || '' });

export default connect(mapStateToProps)(Profile);
