import 'babel-polyfill';
import {
  call,
  put,
  takeLatest,
  takeEvery,
} from 'redux-saga/effects';
import axiosInstance from '../axiosInstance';
import {
	RECIPES_GET,
	RECIPES_GET_SUCCESS,
	RECIPES_GET_FAILURE,

	RECIPES_DELETE_REQUEST,
	RECIPES_DELETE_SUCCESS,
	RECIPES_DELETE_FAILURE,

	RECIPES_EDIT,
	RECIPES_EDIT_SUCCESS,
	RECIPES_EDIT_FAILURE,
} from '../constants/action-types';

export function *watchRecipesGet() {
	yield takeLatest(RECIPES_GET, recipesGet)
}

function *recipesGet() {
  console.log('trying to get recipes')
	const recipes = yield call(axiosInstance.get, '/recipes');
	yield put({type: RECIPES_GET_SUCCESS, value: recipes.data});
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

export function *watchRecipesEdit() {
	yield takeEvery(RECIPES_EDIT, recipesEdit);
}

function *recipesEdit(action) {
	if (!action.value) { return }
	const recipeEditted = yield call(axiosInstance.put, `/recipes/${action.value._id}`, action.value);
	yield put({type: RECIPES_EDIT_SUCCESS, recipeEditted});
}
