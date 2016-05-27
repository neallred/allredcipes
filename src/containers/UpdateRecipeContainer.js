import React from 'react'
import { isEditing } from '../actions'
import { updateRecipe } from '../actions'
import { UpdateRecipe } from '../components/UpdateRecipe'
import { reduxForm, reset } from 'redux-form'

const UpdateRecipeContainer = reduxForm(
  {
    form: 'updateRecipe',
    fields: ['recipeId', 'hideIngredients', 'name', 'ingredients', 'instructions', 'author'],
    initialValues: {
      hideIngredients: 'state.isEditing.hideIngredients',
      ingredients: 'state.isEditing.ingredients',
      instructions: 'state.isEditing.instructions',
      author: 'state.isEditing.author',
    }
  },
  (state, ownProps) => {
    //console.log(state)
    return {
      isEditing: state.isEditing,
      recipeToEdit: state.recipeToEdit
      //this anonymous function is mapStateToProps
    }
  },
  (dispatch, ownProps) => {
    return {
      //this anonymous function is mapDispatchToProps
      onSubmit: (values) => {
        console.log(values)
        if(values.name){
          if(!values.name.trim()){return}
          if(values.recipeId === 'undefined'){return}
          console.log(values.recipeId)
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
