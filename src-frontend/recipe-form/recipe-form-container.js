import React from 'react';
import { connect } from 'react-redux';
//import { isEditing } from '../actions';
//import { updateRecipe } from '../actions';
import { RECIPE_UPDATE_REQUEST } from '../constants/action-types';
import { RecipeForm } from './recipe-form';

const mapStateToProps = (state, ownProps) => {
	const {isEditing = {}} = state
  const recipeToEdit = state.recipes.find(recipe => recipe.id === isEditing.id) || {}

	const {hideIngredients='', name='', ingredients='', instructions='', author=''} = recipeToEdit
	const recipeId = recipeToEdit.id

	return {
		author,
		hideIngredients,
		ingredients,
		instructions,
		isEditing,
		name,
		recipeId
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSubmit: (values) => {
			if(!values.name || !values.name.trim() || values.recipeId === undefined){return}
			//dispatch({type: RECIPE_UPDATE_REQUEST, value: values});
		},
		onCancel: (values) => {
			//dispatch(isEditing())
		},
		onChange: (e) => {
			//dispatch({type: 'nonsense_type'});
		}
	}
}

const RecipeFormContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipeForm);

export{RecipeFormContainer}
