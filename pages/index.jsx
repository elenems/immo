import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import fetch from 'isomorphic-unfetch';
import Header from '../shared/Header';
import Presentation from '../components/HomePage/Presentation/index';
import ImagesContainer from '../components/HomePage/ImagesContainer/index';
import Card from '../ui_components/Card/index';

function Index({ photos }) {
  return (
    <div>
      <Header />
      <Card />
      <Presentation />
      <div className="container">
        <ImagesContainer photos={photos} />
      </div>
    </div>
  );
}

Index.propTypes = {
  photos: PropTypes.array,
};

Index.defaultProps = {
  photos: [],
};

Index.getInitialProps = async () => {
  const API = process.env.REACT_APP_API;
  const res = await fetch(`${API}/getPhotos`);
  const json = await res.json();
  return { photos: json };
};

export default connect()(Index);
