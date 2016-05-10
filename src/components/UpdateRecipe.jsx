import React, {PropTypes} from 'react';
const UpdateRecipe = ({isEditing, onClick, dispatch, ownProps, recipeToEdit}) => {
  let newId = recipeToEdit ? recipeToEdit.id : null
  let newHideIngredients = recipeToEdit ? recipeToEdit.hideIngredients : null
  let newName = recipeToEdit ? recipeToEdit.name : null
  let newIngredients = recipeToEdit ? recipeToEdit.ingredients : null
  let newInstructions = recipeToEdit ? recipeToEdit.instructions : null
  let newAuthor = recipeToEdit ? recipeToEdit.author : null
  return <div
    className={
      isEditing.isEditing ?  'modalDialog opened center-block text-center' : 'modalDialog closed center-block text-center'
    }
    id='dialog'>
    <p className='close-edit-box'>X</p>
    <h2 className='add-recipes'>Edit</h2>
    <form className='container'>
      <input
        id='updateId'
        type='hidden'
        ref={node => { newId = node }}
      />
      <input
        id='updateHideIngredients'
        type='hidden'
        ref={node => { newHideIngredients = node }}
      />
      <input
        id='updateName'
        type='text'
        placeholder='Recipe name'
        ref={node => { newName = node }}
      />
      <br/>
      <textarea
        id='updateIngredients'
        placeholder='Ingredients'
        ref={node => { newIngredients = node }}
      /><br/>
      <textarea 
        id='updateInstructions'
        placeholder='Instructions'
        ref={node => { newInstructions = node }}
      /><br/>
      <input type='text'
        id='updateAuthor'
        placeholder='Recipe author'
        ref={node => { newAuthor = node }}
      /><br/>
      <button
        type='button'
        onClick={onClick}
        className='btn btn-primary'
        id='cancel-edit'
      >
        Cancel edit
      </button><br/>
      <button
        type='submit'
        onClick={onClick}
        className='btn btn-success'
        id='submit-edit'
      >
        Save recipe
      </button>
    </form>
    {document.getElementById('updateId') ? document.getElementById('updateId').value=newId : null }
    {document.getElementById('updatehideIngredients') ? document.getElementById('updateHideIngredients').value=newHideIngredients : null }
    {document.getElementById('updateName') ? document.getElementById('updateName').value=newName : null }
    {document.getElementById('updateIngredients') ? document.getElementById('updateIngredients').value=newIngredients : null }
    {document.getElementById('updateInstructions') ? document.getElementById('updateInstructions').value=newInstructions : null }
    {document.getElementById('updateAuthor') ? document.getElementById('updateAuthor').value=newAuthor : null }
  </div>
}
UpdateRecipe.propTypes = {
  onClick: PropTypes.func.isRequired
}
export {UpdateRecipe} 
