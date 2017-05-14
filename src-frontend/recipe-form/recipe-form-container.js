import React from 'react'
import { connect } from 'react-redux'
import { RecipeForm } from './recipe-form'
import {
  recipesEdit,
  recipesHandleEdit,
  recipesToggleEdit,
} from '../recipe-list/ducks'

export function mapStateToProps(state, ownProps) {

	return {
		recipeEdit: state && state.recipes && state.recipes.recipeEdit,
		recipeCreate: state && state.recipes && state.recipes.recipeCreate,
	}
}

export function mapDispatchToProps(dispatch, ownProps) {
	return {
		recipesSubmitEdit(recipe) {
			if(!recipe.name || !recipe.name.trim() || recipe._id === undefined){return}
			dispatch(recipesEdit(recipe));
		},
		recipesSubmitCreate(recipe) {
			if(!recipe.name || !recipe.name.trim() || recipe._id === undefined){return}
			dispatch(recipesCreate(recipe));
		},
		onCancel(values) {
			dispatch(recipesToggleEdit())
		},
		handleEdit(e, key) {
      const newField = (e && e.target && e.target.value !== undefined) ? e.target.value : e
      dispatch(recipesHandleEdit({[key]: newField}))
		}
	}
}

const RecipeFormContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipeForm);

export{RecipeFormContainer}
