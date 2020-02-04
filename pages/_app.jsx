import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';

import createStore from '../store/store';

function MyApp({ Component, pageProps, store }) {
  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ctx });
  }

  return { pageProps };
};

MyApp.propTypes = {
  Component: PropTypes.object.isRequired,
  pageProps: PropTypes.object.isRequired,
  store: PropTypes.object.isRequired,
};

export default withRedux(createStore)(withReduxSaga(MyApp));
