import jwtDecode from 'jwt-decode';
import Router from 'next/router';

export const dispatchShowCard = (show, hide, text, type, isInProcess) => {
  if (!isInProcess) {
    show({ text, type });
    setTimeout(() => {
      hide();
    }, 3500);
  }
};

export const guardAuthPage = () => {
  if (process.browser) {
    // eslint-disable-next-line no-undef
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 < Date.now()) {
          Router.push('/join');
        }
      } catch (e) {
        Router.push('/join');
      }
    } else {
      Router.push('/join');
    }
  }
};

export const redirectFromAuthPage = () => {
  if (process.browser) {
    // eslint-disable-next-line no-undef
    const token = sessionStorage.getItem('token');
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        if (decodedToken.exp * 1000 > Date.now()) {
          Router.push('/profile');
        }
      // eslint-disable-next-line no-empty
      } catch (e) {}
    }
  }
};

export const removeServerError = (error, field, errorsObj, callback) => {
  if (error && errorsObj[field]) {
    callback({ ...errorsObj, [field]: '' });
  }
};
