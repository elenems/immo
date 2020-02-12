import React from 'react';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Header from '../../shared/Header/index';
import Card from '../../ui_components/Card/index';
import PhotoContainer from '../../components/PhotoPage/PhotoContainer/index';

function Photo({
  photo: { url, name, tags },
  user: { firstName, lastName, email },
}) {
  return (
    <div>
      <Header />
      <Card />
      <div className="container">
        <PhotoContainer
          firstName={firstName}
          lastName={lastName}
          email={email}
          tags={tags}
          photoUrl={url}
          name={name}
        />
        <div>asd</div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            padding-top: 100px;
            justify-content: space-between;
          }
        `}
      </style>
    </div>
  );
}

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
};

Photo.getInitialProps = async (context) => {
  const photoId = context.ctx.query.id;
  let url = `https://europe-west2-immo-764e3.cloudfunctions.net/api/getPhoto?photoId=${photoId}`;
  let res = await fetch(url);
  const photo = await res.json();
  const userId = photo.owner;
  url = `https://europe-west2-immo-764e3.cloudfunctions.net/api/getUser?userId=${userId}`;
  res = await fetch(url);
  const user = await res.json();
  return { photo, user };
};

export default Photo;
