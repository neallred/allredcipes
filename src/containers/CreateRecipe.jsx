import React from 'react'
import { connect } from 'react-redux'
import { createRecipe } from '../actions'

let CreateRecipe = ({ dispatch }) => {
  let inputName
  let inputIngredients
  let inputInstructions
  let inputAuthor
  return <div className='center-block text-center'>
    <h2>Add recipes here!</h2>
    <form
      onSubmit={e => {
        e.preventDefault()
        if(!inputName.value.trim()){
          return
        }
        dispatch(createRecipe(inputName.value, inputIngredients.value, inputInstructions.value, inputAuthor.value))
        inputName.value = ''
        inputIngredients.value = ''
        inputInstructions.value = ''
        inputAuthor.value = ''
      }}
    >
      <input type='text'
        placeholder='Recipe name'
        ref={node => { inputName = node }}
      /><br/>
      <textarea
        placeholder='Ingredients'
        ref={node => { inputIngredients = node }}
      /><br/>
      <textarea 
        placeholder='Instructions'
        ref={node => { inputInstructions = node }}
      /><br/>
      <input type='text'
        placeholder='Recipe author'
        ref={node => { inputAuthor = node }}
      /><br/>
      <button
        type='submit'
        className='btn btn-success'
      >
        Create Recipe
      </button>
    </form>
  </div>
}
CreateRecipe = connect()(CreateRecipe)
export { CreateRecipe }
