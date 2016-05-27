import React from 'react'

import { createRecipe } from '../actions'
import { CreateRecipe } from '../components/CreateRecipe'
import { reduxForm, reset } from 'redux-form'

const CreateRecipeContainer = reduxForm(
  {
    form: 'createRecipe',
    fields: ['name', 'ingredients', 'instructions', 'author']
  },
  (state, ownProps) => {
    return {
      //this anonymous function is mapStateToProps
    }
  },
  (dispatch, ownProps) => {
    return {
      //this anonymous function is mapDispatchToProps
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
