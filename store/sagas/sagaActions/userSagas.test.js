import * as functions from './functions';
import { joinUserSaga } from './userSagas';

const dispatchSuccess = jest.spyOn(functions, 'dispatchSuccess');
const completeAuthIn = jest.spyOn(functions, 'completeAuthIn');
const addError = jest.spyOn(functions, 'addError');

describe('userSagas', () => {
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

  it('Dispatches an error', () => {
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
