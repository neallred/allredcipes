import React from 'react';

import { createRecipe } from './sagas';
import { CreateRecipe } from './create-recipe';
import { reduxForm, reset } from 'redux-form';
import { RECIPE_CREATE_REQUEST } from '../action-types';

const CreateRecipeContainer = reduxForm(
	{
		form: 'createRecipe',
		fields: ['name', 'ingredients', 'instructions', 'author']
	},
	(state, ownProps) => {
		//this anonymous function is mapStateToProps
		return {
		}
	},
	(dispatch, ownProps) => {
		//this anonymous function is mapDispatchToProps
		return {
			onSubmit: (values = {}) => {
				const { name, ingredients, instructions, author } = values;
				if( !name || (typeof name !== 'string') || !name.trim()){
					return false;
				}
				dispatch({
					type: RECIPE_CREATE_REQUEST,
					value: {name, ingredients, instructions, author, hideIngredients: true}
				});
				//dispatch(reset('createRecipe'))
			}
		}
	}
)(CreateRecipe);
export{CreateRecipeContainer}
