import React, {PropTypes} from 'react'
import { connect } from 'react-redux'
import { updateRecipe } from '../actions'

let UpdateRecipe = ({ dispatch}) => {
  let newId
  let newHideIngredients
  let newName
  let newIngredients
  let newInstructions
  let newAuthor
  //const {store} = this.context;
  //const state = store.getState();
  return <div
    className={''
      //openModal ?
      //  'modalDialog opened center-block text-center' :
      //  'modalDialog center-block text-center'
    }
    id='dialog'>
    <p className='close-edit-box'>{console.log('openModal')}X</p>
    <h2 className='add-recipes'>Edit</h2>
    <form
      className='container'
      onSubmit={e => {
        e.preventDefault()
        if(!newName.value.trim()){
          return
        }
        dispatch(updateRecipe(newName.value, newIngredients.value, newInstructions.value, newAuthor.value))
        newId.value = ''
        newHideIngredients.value = ''
        newName.value = ''
        newIngredients.value = ''
        newInstructions.value = ''
        newAuthor.value = ''
      }}
    >
      <input type='text'
        placeholder='Recipe name'
        ref={node => { newName = node }}
      /><br/>
      <textarea
        placeholder='Ingredients'
        ref={node => { newIngredients = node }}
      /><br/>
      <textarea 
        placeholder='Instructions'
        ref={node => { newInstructions = node }}
      /><br/>
      <input type='text'
        placeholder='Recipe author'
        ref={node => { newAuthor = node }}
      /><br/>
      <button type='button'
        onClick={
          console.log('trumm')
        }
      >
        Cancel edit
      </button><br/>
      <button type='submit'>
        Save recipe
      </button>
    </form>
  </div>
}

UpdateRecipe = connect()(UpdateRecipe)
export { UpdateRecipe }
