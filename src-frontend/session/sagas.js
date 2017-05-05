import 'babel-polyfill'
import {
  call,
  put,
  takeEvery,
} from 'redux-saga/effects';
import { axiosInstance } from '../axiosInstance'
import {
	SESSION_LOGIN_REQUEST,
	SESSION_LOGIN_SUCCESS,
	SESSION_LOGIN_FAILURE,

	SESSION_CHECK_STATUS_REQUEST,
	SESSION_CHECK_STATUS_SUCCESS,
	SESSION_CHECK_STATUS_FAILURE,

	SESSION_LOGOUT_REQUEST,
	SESSION_LOGOUT_SUCCESS,
	SESSION_LOGOUT_FAILURE
} from '../constants/action-types'

function *sessionLoginRequest(action) {
	if (!action.value) { return }
	const session = yield call(axiosInstance.post, `/session`, action.value)
	console.log(session)
	if (session.data.token) {
		yield put({type: SESSION_LOGIN_SUCCESS, session})
	}
	else {
		yield put({type: SESSION_LOGIN_FAILURE, session})
	}
}

export function *watchSessionLoginRequest() {
	yield takeEvery(SESSION_LOGIN_REQUEST, sessionLoginRequest)
}

function *sessionCheckStatusRequest() {
	const session = yield call(axiosInstance.get, `/session`)
	console.log('checked session status')
	console.log(session)
	if (session.data.isLoggedIn) {
		yield put({type: SESSION_CHECK_STATUS_SUCCESS, session})
	}
	else {
		yield put({type: SESSION_CHECK_STATUS_FAILURE, session})
	}
}

export function *watchSessionCheckStatusRequest() {
	yield takeEvery(SESSION_CHECK_STATUS_REQUEST, sessionCheckStatusRequest)
}


function *sessionLogoutRequest(action) {
	const session = yield call(axiosInstance.delete, '/session')
	yield put({type: SESSION_LOGOUT_SUCCESS, value: session})
}

export function *watchSessionLogoutRequest() {
	yield takeEvery(SESSION_LOGOUT_REQUEST, sessionLogoutRequest)
}
