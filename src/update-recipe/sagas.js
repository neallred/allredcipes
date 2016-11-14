import 'babel-polyfill';
import { takeEvery, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axiosInstance from '../axiosInstance';
import {
	RECIPE_UPDATE_REQUEST,
	RECIPE_UPDATE_SUCCESS,
	RECIPE_UPDATE_FAILURE,
} from '../action-types';


function *updateRecipe(action) {
	if (!action.value || !action.value.recipeId) { return }
	const recipe = yield call(axiosInstance.put, `/recipes/${action.value.recipeId}`, action.value);
	console.log(recipe);
	console.log(recipe.data);
	yield put({type: RECIPE_UPDATE_SUCCESS, recipe: recipe.data});
}

export function *watchUpdateRecipe() {
	yield takeEvery(RECIPE_UPDATE_REQUEST, updateRecipe);
}

