import tape from 'tape'
const test = tape

import {
	SESSION_LOGIN_REQUEST,
	SESSION_LOGIN_SUCCESS,

	SESSION_CHECK_STATUS_REQUEST,
	SESSION_CHECK_STATUS_SUCCESS,

	SESSION_LOGOUT_REQUEST,
	SESSION_LOGOUT_SUCCESS,
} from '../constants/action-types'

import {
  session,
  sessionDefaultState,

  sessionCheckStatus,
  sessionLogin,
  sessionLogout,
} from './ducks'
const reducer = session

const defaultState = {
	isLoggedIn: false,
	buttonSelected: 'login'
};

test('Session ducks', (t) => {

  t.test('reducer SESSION_LOGIN_SUCCESS case', t => {
    const reducerResult = reducer(defaultState, {type: SESSION_LOGIN_SUCCESS})
    
    t.plan(1)
    t.equal(
      reducerResult.isLoggedIn,
      true,
      'sets isLoggedIn to true'
    )
  })

  t.test('reducer SESSION_LOGOUT_SUCCESS case', t => {
    const reducerResult = reducer(defaultState, {type: SESSION_LOGOUT_SUCCESS})
    
    t.plan(1)
    t.equal(
      reducerResult.isLoggedIn,
      false,
      'sets isLoggedIn to false'
    )
  })

  t.test('reducer SESSION_CHECK_STATUS_SUCCESS case', t => {
    const reducerResult = reducer(defaultState, {type: SESSION_CHECK_STATUS_SUCCESS, value: 'goats'})
    
    t.plan(1)
    t.equal(
      reducerResult.isLoggedIn,
      'goats',
      'sets isLoggedIn action.value'
    )
  })

  t.test('reducer default case', t => {
    const reducerResult = reducer(defaultState, {type: 'NONSENSE', value: 'goats'})
    
    t.plan(1)
    t.deepEqual(
      reducerResult,
      defaultState,
      'returns prior state'
    )
  })

  t.test('reducer provides default state when there was none previously', t => {
    const reducerResult = reducer(undefined, {type: 'NONSENSE', value: 'goats'})
    
    t.plan(1)
    t.deepEqual(
      sessionDefaultState,
      defaultState,
    )
  })

  t.test('', t => {
    const setup = [
      {method: sessionCheckStatus, type: SESSION_CHECK_STATUS_REQUEST},
      {method: sessionLogin, type: SESSION_LOGIN_REQUEST},
      {method: sessionLogout, type: SESSION_LOGOUT_REQUEST},
    ]

    t.plan(setup.length)
    setup.map(testData => {
      const createdAction = testData.method()

      t.equal(
        createdAction.type,
        testData.type,
        `${testData.method.name} creates an object with type ${testData.type}` 
      )
    })
  })
})
