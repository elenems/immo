/* eslint-disable no-return-assign */
import Router from 'next/router';
import { redirectTo, usePageToRedirectTo } from './functions';

describe('HeaderButton functions', () => {
  afterAll(() => {
    jest.clearAllMocks();
  });
  it('Calls Routers push', () => {
    const mock = jest.spyOn(Router, 'push');
    mock.mockImplementationOnce((page) => page);
    redirectTo('/login')();
    expect(mock).toHaveBeenCalledWith('/login');
  });
  it('Returns correct page', () => {
    expect(usePageToRedirectTo(true)).toBe('/load');
    expect(usePageToRedirectTo(false)).toBe('/login');
  });
});
