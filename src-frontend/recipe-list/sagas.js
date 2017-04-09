import 'babel-polyfill';
import { takeLatest, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axiosInstance from '../axiosInstance';
import {
	RECIPES_GET,
	RECIPES_GET_SUCCESS,
	RECIPES_GET_FAILURE,

	RECIPES_DELETE_REQUEST,
	RECIPES_DELETE_SUCCESS,
	RECIPES_DELETE_FAILURE,
} from '../constants/action-types';

function *recipesGet() {
	const recipes = yield call(axiosInstance.get, '/recipes');
	yield put({type: RECIPES_GET_SUCCESS, value: recipes.data});
}

export function *watchRecipesGet() {
	yield takeLatest(RECIPES_GET, recipesGet)
}

function *recipesDelete(action) {
	if (!action.value) { return }
	const recipes = yield call(axiosInstance.delete, `/recipes/${action.value}`);
	console.log(recipes);
	const recipeIdToDelete = recipes && recipes.data && recipes.data.id
	yield put({type: RECIPE_DELETE_SUCCESS, recipeIdToDelete});
}

export function *watchRecipesDelete() {
	yield takeEvery(RECIPE_DELETE_REQUEST, recipesDelete);
}
