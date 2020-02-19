import Router from 'next/router';

export const redirectTo = (page) => () => Router.push(page);

export const usePageToRedirectTo = (isAuth) => (isAuth ? '/load' : '/login');
