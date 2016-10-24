import 'babel-polyfill';
import _ from 'lodash';
import { takeEvery, delay } from 'redux-saga';
import { call, put } from 'redux-saga/effects';
import axios from 'axios';
import {
	RECIPE_CREATE_REQUEST,
	RECIPE_CREATE_SUCCESS,
	RECIPE_CREATE_FAILURE
} from '../action-types';

function *createRecipe(action) {
	const recipe = yield call(axios.post, '/recipes', action.value);
	yield put({type: RECIPE_CREATE_SUCCESS, recipe: recipe.data});
}

export function *watchCreateRecipe() {
	yield takeEvery(RECIPE_CREATE_REQUEST, createRecipe);
}

