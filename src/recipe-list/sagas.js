import 'babel-polyfill';
import { takeLatest, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
	RECIPES_REQUEST,
	RECIPES_SUCCESS,
	RECIPES_FAILURE
} from '../action-types';

function *fetchRecipes() {
	const recipes = yield call(axios.get, '/recipes');
	yield put({type: RECIPES_SUCCESS, recipes: recipes.data});
}

export function *watchFetchRecipes() {
	yield takeLatest(RECIPES_REQUEST, fetchRecipes)
}

