import 'babel-polyfill'
import { takeEvery, delay } from 'redux-saga'
import { call, put } from 'redux-saga/effects'
import axios from 'axios';

function *fetchRecipes() {
	const recipes = yield call(axios.get, '/recipes');
	yield put({type: 'RECIPES_SUCCESS', recipes: recipes.data});
}

function *watchFetchRecipes() {
	yield takeEvery('RECIPES_REQUEST', fetchRecipes)
}

export function *rootSaga() {
	yield [
		watchFetchRecipes()
	]
}
