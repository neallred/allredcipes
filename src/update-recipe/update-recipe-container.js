import React from 'react'
import { isEditing } from '../actions'
import { updateRecipe } from '../actions'
import { UpdateRecipe } from './update-recipe'
import { reduxForm, reset } from 'redux-form'

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
		const {recipeToEdit = {}, isEditing = false} = state;
		const {name = '', recipeId = '', hideIngredients = '', ingredients = '', instructions = '', author = ''} = recipeToEdit;
		return {
			recipeEditName: name,
			isEditing: isEditing,
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
				if(values.name){
					if(!values.name.trim() || values.recipeId === 'undefined'){return}
					dispatch(updateRecipe(
						values.recipeId,
						values.hideIngredients,
						values.name,
						values.ingredients,
						values.instructions,
						values.author
					))
					dispatch(reset('updateRecipe'))
				}
				dispatch(isEditing())
			},
			onClick: (values) => {
				dispatch(isEditing())
			}
		}
	}
)(UpdateRecipe);
export{UpdateRecipeContainer}
