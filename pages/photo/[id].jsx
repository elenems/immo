import React, { useEffect } from 'react';
import Head from 'next/head';
import PropTypes from 'prop-types';
import fetch from 'isomorphic-unfetch';
import Header from '../../shared/Header/index';
import Card from '../../ui_components/Card/index';
import PhotoContainer from '../../components/PhotoPage/PhotoContainer/index';
import PhotosGallery from '../../shared/PhotosGallery/index';

const { REACT_APP_API } = process.env;
function Photo({
  photo: {
    url,
    name,
    tags,
    views,
    id,
  },
  user: { firstName, lastName, email },
  relatedPhotos,
}) {
  useEffect(() => {
    fetch(`${REACT_APP_API}/addView?photoId=${id}`, {
      method: 'POST',
    });
  }, [id]);
  return (
    <div>
      <Head>
        <title>{`${name} | ${firstName} ${lastName || ''}`}</title>
        <meta name="Description" content={`Photo ${name} by ${firstName} ${lastName || ''}`} />
        <meta charset="utf-8" key="charset" />
      </Head>
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
          views={views}
          photoId={id}
        />
        <div className="related-block">
          <h4>Related</h4>
          <PhotosGallery photos={relatedPhotos} imageWidth={280} />
        </div>
      </div>
      <style jsx>
        {`
          .container {
            display: flex;
            padding-top: 100px;
          }

          .related-block {
            margin-left: 80px;
          }

          @media (max-width: 960px) {
            .container {
              flex-direction: column;
              align-items: center;
            }

            .related-block {
              margin-top: 10px;
              margin-left: 0px;
              align-self: self-start;
            }
          }
        `}
      </style>
    </div>
  );
}

Photo.propTypes = {
  photo: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  relatedPhotos: PropTypes.array,
};

Photo.defaultProps = {
  relatedPhotos: [],
};

Photo.getInitialProps = async (context) => {
  const API = process.env.REACT_APP_API;
  const photoId = context.ctx.query.id;
  const urlToFetchImage = `${API}/getPhoto?photoId=${photoId}`;
  const res = await fetch(urlToFetchImage);
  const photo = await res.json();

  const userId = photo.owner;
  const { tags } = photo;
  const urlsToFetch = [
    `${API}/getUser?userId=${userId}`,
    `${API}/getRelatedPhotos?tags=${tags}`,
  ];
  let user;
  let relatedPhotos = null;
  await Promise.all(urlsToFetch.map((u) => fetch(u)))
    .then((responses) => Promise.all(responses.map((response) => response.json())))
    .then((objects) => {
      [user, relatedPhotos] = objects;
    });
  const relatedWithoutShown = relatedPhotos.related.filter(
    (relatedPhoto) => relatedPhoto.id !== photoId,
  );
  return { photo, user, relatedPhotos: relatedWithoutShown };
};

export default Photo;
