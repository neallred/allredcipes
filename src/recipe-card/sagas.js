import 'babel-polyfill';
import { takeEvery, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axiosInstance from '../axiosInstance';
import {
	RECIPE_DELETE_REQUEST,
	RECIPE_DELETE_SUCCESS,
	RECIPE_DELETE_FAILURE
} from '../action-types';

function *deleteRecipe(action) {
	if (!action.value) { return }
	const recipes = yield call(axiosInstance.delete, `/recipes/${action.value}`);
	console.log(recipes);
	const recipeIdToDelete = recipes && recipes.data && recipes.data.id
	yield put({type: RECIPE_DELETE_SUCCESS, recipeIdToDelete});
}

export function *watchDeleteRecipe() {
	yield takeEvery(RECIPE_DELETE_REQUEST, deleteRecipe);
}
