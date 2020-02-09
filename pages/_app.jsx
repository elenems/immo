import React from 'react';
import PropTypes from 'prop-types';
import { Provider } from 'react-redux';
import withRedux from 'next-redux-wrapper';
import withReduxSaga from 'next-redux-saga';
import jwtDecode from 'jwt-decode';
import Router from 'next/router';
import { logoutAction, authenticateAction } from '../store/actions';
import '../public/styles/index.scss';

import createStore from '../store/store';

function MyApp({ Component, pageProps, store }) {
  if (process.browser) {
    // eslint-disable-next-line no-undef
    const token = sessionStorage.getItem('token');
    if (token) {
      const decodedToken = jwtDecode(token);
      if (decodedToken.exp * 1000 < Date.now()) {
        store.dispatch(logoutAction());
        Router.push('/');
      } else if (!store.getState().auth.isAuthenticated) {
        store.dispatch(authenticateAction());
      }
    }
  }

  return (
    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );
}

// Blocking automatic static optimization in order to use store
MyApp.getInitialProps = async ({ Component, ctx }) => {
  let pageProps = {};

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps({ ctx });
  }

  return { pageProps };
};

MyApp.propTypes = {
  Component: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  pageProps: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
  store: PropTypes.oneOfType([PropTypes.object, PropTypes.func]).isRequired,
};

export default withRedux(createStore)(withReduxSaga(MyApp));
