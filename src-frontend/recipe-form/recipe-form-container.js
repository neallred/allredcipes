import React from 'react'
import { connect } from 'react-redux'
import {
  RECIPE_UPDATE_REQUEST
} from '../constants/action-types'
import { RecipeForm } from './recipe-form'
import {
  recipesUpdate,
  recipesHandleEdit,
  recipesToggleEdit,
} from '../recipe-list/ducks'

export function mapStateToProps(state, ownProps) {

	return {
		recipeEdit: state && state.recipes && state.recipes.recipeEdit,
	}
}

export function mapDispatchToProps(dispatch, ownProps) {
	return {
		onSubmit: () => {
			if(!values.name || !values.name.trim() || values.recipeId === undefined){return}
			dispatch({type: RECIPE_UPDATE_REQUEST, value: values});
		},
		onCancel: (values) => {
			dispatch(recipesToggleEdit())
		},
		handleEdit: (e, key) => {
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
