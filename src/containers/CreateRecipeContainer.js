import React from 'react'
import { connect } from 'react-redux'
import { createRecipe } from '../actions'
import { CreateRecipe } from '../components/CreateRecipe'

const mapStateToProps = (state, ownProps) => {
  return {
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onSubmit: (e) => {
      e.preventDefault()
      let inputName = document.getElementById('inputName')
      let inputIngredients = document.getElementById('inputIngredients')
      let inputInstructions = document.getElementById('inputInstructions')
      let inputAuthor = document.getElementById('inputAuthor')
      if(!inputName.value.trim()){ return }
      dispatch(createRecipe(inputName.value, inputIngredients.value, inputInstructions.value, inputAuthor.value))
      inputName.value = ''
      inputIngredients.value = ''
      inputInstructions.value = ''
      inputAuthor.value = ''
    }
  }
}

export const CreateRecipeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(CreateRecipe)
