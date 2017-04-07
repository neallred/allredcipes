import 'babel-polyfill';
import { takeEvery, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import { axiosInstance } from '../axiosInstance';
import {
	SESSION_CREATE_REQUEST,
	SESSION_CREATE_SUCCESS,
	SESSION_CREATE_FAILURE,

	SESSION_DELETE_REQUEST,
	SESSION_DELETE_SUCCESS,
	SESSION_DELETE_FAILURE
} from '../constants/action-types';

function *createSession(action) {
	const session = yield call(axiosInstance.post, '/session', {username: action.username, password: action.password});
	yield put({type: SESSION_CREATE_SUCCESS, value: session});
}

export function *watchCreateSession() {
	yield takeEvery(SESSION_CREATE_REQUEST, createSession);
}

function *deleteSession(action) {
	const session = yield call(axiosInstance.delete, '/session');
	yield put({type: SESSION_DELETE_SUCCESS, value: session});
}

export function *watchDeleteSession() {
	yield takeEvery(SESSION_DELETE_REQUEST, deleteSession);
}
