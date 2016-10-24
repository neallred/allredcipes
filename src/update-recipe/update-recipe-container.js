import React from 'react';
import _ from 'lodash';
import { isEditing } from '../actions';
import { updateRecipe } from '../actions';
import { RECIPE_UPDATE_REQUEST } from '../action-types';
import { UpdateRecipe } from './update-recipe';
import { reduxForm, reset } from 'redux-form';

const UpdateRecipeContainer = reduxForm(
	{
		form: 'updateRecipe',
		fields: [
			'recipeId',
			'hideIngredients',
			'name',
			'ingredients',
			'instructions',
			'author'
		],
	},
	(state, ownProps) => {
		//this anonymous function is mapStateToProps
		const {isEditing = {}} = state;
		const recipeToEdit = _.find(state.recipes, {id: isEditing.id}) || {};

		const {hideIngredients, name, ingredients, instructions, author} = recipeToEdit;
		const recipeId = recipeToEdit.id;

		return {
			isEditingFlag: isEditing.flag,
			initialValues: {
				recipeId,
				hideIngredients,
				name,
				ingredients,
				instructions,
				author
			}
		}
	},
	(dispatch, ownProps) => {
		//this anonymous function is mapDispatchToProps
		return {
			onSubmit: (values) => {
				if(!values.name || !values.name.trim() || values.recipeId === undefined){return}
				dispatch({type: RECIPE_UPDATE_REQUEST, value: values});
				dispatch(reset('updateRecipe'));
				dispatch(isEditing());
			},
			onCancel: (values) => {
				dispatch(isEditing())
			}
		}
	}
)(UpdateRecipe);
export{UpdateRecipeContainer}
