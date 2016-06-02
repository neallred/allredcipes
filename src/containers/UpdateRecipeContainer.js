import React from 'react'
import { isEditing } from '../actions'
import { updateRecipe } from '../actions'
import { UpdateRecipe } from '../components/UpdateRecipe'
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
    return {
      recipeEditName: state.isEditing.recipeToEdit ?
        state.isEditing.recipeToEdit.name :
        '',
      isEditing: state.isEditing.isEditing,
      initialValues: {
        recipeId: state.isEditing.recipeToEdit ?
          state.isEditing.recipeToEdit.recipeId :
          '',
        hideIngredients: state.isEditing.recipeToEdit ?
          state.isEditing.recipeToEdit.hideIngredients :
          '',
        name: state.isEditing.recipeToEdit ?
          state.isEditing.recipeToEdit.name :
          '',
        ingredients: state.isEditing.recipeToEdit ?
          state.isEditing.recipeToEdit.ingredients :
          '',
        instructions: state.isEditing.recipeToEdit ?
          state.isEditing.recipeToEdit.instructions :
          '',
        author:  state.isEditing.recipeToEdit ?
          state.isEditing.recipeToEdit.author :
          ''
      }
    }
  },
  (dispatch, ownProps) => {
      //this anonymous function is mapDispatchToProps
    return {
      onSubmit: (values) => {
        if(values.name){
          if(!values.name.trim()){return}
          if(values.recipeId === 'undefined'){return}
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
