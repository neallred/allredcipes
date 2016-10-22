import React from 'react'

import { createRecipe } from '../actions'
import { CreateRecipe } from './create-recipe'
import { reduxForm, reset } from 'redux-form'

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
			onSubmit: (values) => {
				if(!values.name.trim()){return}
				dispatch(createRecipe(
					values.name,
					values.ingredients,
					values.instructions,
					values.author
				))
				dispatch(reset('createRecipe'))
			}
		}
	}
)(CreateRecipe);
export{CreateRecipeContainer}
