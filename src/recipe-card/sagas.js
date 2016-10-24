import 'babel-polyfill';
import { takeEvery, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
	RECIPE_DELETE_REQUEST,
	RECIPE_DELETE_SUCCESS,
	RECIPE_DELETE_FAILURE
} from '../action-types';

function *deleteRecipe(action) {
	if (!action.value) { return }
	const recipes = yield call(axios.delete, `/recipes/${action.value}`);
	yield put({type: RECIPE_DELETE_SUCCESS, recipes: recipes.data});
}

export function *watchDeleteRecipe() {
	yield takeEvery(RECIPE_DELETE_REQUEST, deleteRecipe);
}
