import React from 'react'
import { connect } from 'react-redux'
import {
  RECIPE_UPDATE_REQUEST
} from '../constants/action-types'
import { RecipeForm } from './recipe-form'
import {
  recipesUpdate,
  recipesHandleEdit 
} from '../recipe-list/ducks'

const mapStateToProps = (state, ownProps) => {

	return {
		recipeEdit: state && state.recipes && state.recipes.recipeEdit,
	}
}

const mapDispatchToProps = (dispatch, ownProps) => {
	return {
		onSubmit: () => {
			if(!values.name || !values.name.trim() || values.recipeId === undefined){return}
			dispatch({type: RECIPE_UPDATE_REQUEST, value: values});
		},
		onCancel: (values) => {
			//dispatch(isEditing())
		},
		handleEdit: (e) => {
      const newField = (e && e.target && e.target.value) ? e.target.value : e
			dispatch(recipesHandleEdit(newField))
		}
	}
}

const RecipeFormContainer = connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipeForm);

export{RecipeFormContainer}
