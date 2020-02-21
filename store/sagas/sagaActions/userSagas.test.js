import { put } from 'redux-saga/effects';
import axios from 'axios';
import * as functions from './functions';
import {
  joinUserSaga,
  loginUserSaga,
  logoutUserSaga,
  getUserSaga,
  likePhotoSaga,
  unlikePhotoSaga,
} from './userSagas';

const dispatchSuccess = jest.spyOn(functions, 'dispatchSuccess');
const completeAuthIn = jest.spyOn(functions, 'completeAuthIn');
const addError = jest.spyOn(functions, 'addError');
const completeAuthOut = jest.spyOn(functions, 'completeAuthOut');
const spyAxios = jest.spyOn(axios, 'get');
const dispatchSuccessWithCard = jest.spyOn(
  functions,
  'dispatchSuccessWithCard',
);

beforeEach(() => {
  jest.clearAllMocks();
});

describe('Join user saga', () => {
  it('Authenticates user', () => {
    const action = { payload: { values: { name: 'Bob' } } };
    const gen = joinUserSaga(action);
    gen.next();
    gen.next({ data: { token: 'token' } });
    expect(dispatchSuccess.mock.calls).toEqual([
      ['JOIN_SUCCESS', 'GET_USER', { payload: { values: { name: 'Bob' } } }],
    ]);
    gen.next();
    expect(completeAuthIn.mock.calls).toEqual([['token']]);
  });

  it('Dispatches an error if join failed', () => {
    dispatchSuccess.mockImplementationOnce(() => {
      // eslint-disable-next-line no-throw-literal
      throw { response: { data: 'Error' } };
    });
    const action = { payload: { setJoinErrors() {} } };
    const gen = joinUserSaga(action);
    gen.next();
    gen.next();
    expect(addError).toHaveBeenCalledTimes(1);
    expect(addError.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "Error",
    [Function],
    Object {
      "payload": Object {
        "setJoinErrors": [Function],
      },
    },
  ],
]
`);
  });
});

describe('Login user saga', () => {
  it('Login user', () => {
    const action = { payload: { values: { name: 'Name' } } };
    const gen = loginUserSaga(action);
    gen.next();
    gen.next({ data: { token: 'token' } });
    expect(dispatchSuccess).toHaveBeenCalledWith('LOG_IN_SUCCESS', 'GET_USER', {
      payload: { values: { name: 'Name' } },
    });
    gen.next();
    expect(completeAuthIn).toHaveBeenCalledWith('token');
  });

  it('Dispatches an error if login failed', () => {
    dispatchSuccess.mockImplementationOnce(() => {
      // eslint-disable-next-line no-throw-literal
      throw { response: { data: 'Error' } };
    });
    const action = { payload: { setLoginErrors() {} } };
    const gen = loginUserSaga(action);
    gen.next();
    gen.next();
    expect(addError).toHaveBeenCalledTimes(1);
    expect(addError.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "Error",
    [Function],
    Object {
      "payload": Object {
        "setLoginErrors": [Function],
      },
    },
  ],
]
`);
  });
});

describe('Logout user saga', () => {
  it('Successfuly logouts', () => {
    const gen = logoutUserSaga();
    gen.next();
    expect(completeAuthOut).toHaveBeenCalledTimes(1);
  });

  it('Logout throws error', () => {
    completeAuthOut.mockImplementationOnce(() => {
      throw new Error();
    });
    const gen = logoutUserSaga();
    expect(gen.next().value).toEqual(put({ type: 'LOG_OUT_FAIL' }));
    expect(completeAuthOut).toHaveBeenCalledTimes(1);
  });
});

describe('getUserSaga', () => {
  it('Authenticates user', () => {
    spyAxios.mockReturnValue({ data: 'data' });
    const gen = getUserSaga({ payload: 'bob' });
    gen.next();
    expect(spyAxios).toHaveBeenCalledWith(
      `${process.env.REACT_APP_API}/getUser?userId=bob`,
    );
    expect(gen.next({ data: 'bob' }).value).toEqual(
      put({ type: 'AUTHENTICATE', payload: 'bob' }),
    );
    expect(gen.next().done).toBe(true);
  });

  it('Dispatches USER_FAIL', () => {
    spyAxios.mockImplementationOnce(() => {
      throw new Error();
    });
    const gen = getUserSaga({ payload: 'bob' });
    gen.next();
    expect(spyAxios).toHaveBeenCalledTimes(1);
  });
});

describe('likePhotoSaga', () => {
  it('Shows success card', () => {
    const action = { payload: { photoId: '1' } };
    const gen = likePhotoSaga(action);
    gen.next();
    gen.next({ data: { message: 'Success' } });
    expect(dispatchSuccessWithCard).toHaveBeenCalledTimes(1);
    expect(dispatchSuccessWithCard.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "Success",
    "ADD_PHOTO_TO_FAVOURITE_SUCCESS",
    "1",
  ],
]
`);
  });
});

describe('unlikePhotoSaga', () => {
  it('Shows success card', () => {
    const action = { payload: { photoId: '1' } };
    const gen = unlikePhotoSaga(action);
    gen.next();
    gen.next({ data: { message: 'Success' } });
    expect(dispatchSuccessWithCard).toHaveBeenCalledTimes(1);
    expect(dispatchSuccessWithCard.mock.calls).toMatchInlineSnapshot(`
Array [
  Array [
    "Success",
    "REMOVE_PHOTO_FROM_FAVOURITE_SUCCESS",
    "1",
  ],
]
`);
  });
});
