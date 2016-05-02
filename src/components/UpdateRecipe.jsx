import React, {PropTypes} from 'react';
const UpdateRecipe = ({isEditing, onClick, dispatch, ownProps, recipeToEdit}) => {
  let newId
  let newHideIngredients
  let newName
  let newIngredients
  let newInstructions
  let newAuthor
  return <div
    className={
      isEditing.isEditing ?  'modalDialog opened center-block text-center' : 'modalDialog closed center-block text-center'
    }
    id='dialog'>
    <p className='close-edit-box'>X</p>
    <h2 className='add-recipes'>Edit</h2>
    <form className='container'>
      <input
        type='hidden'
        ref={node => { newId = node }}
        value={recipeToEdit ? recipeToEdit.id : null}
      />
      <input
        type='hidden'
        ref={node => { newHideIngredients = node }}
        value={recipeToEdit ? recipeToEdit.hideIngredients : null}
      />
      <input
        type='text'
        placeholder='Recipe name'
        ref={node => { newName = node }}
        value={recipeToEdit ? recipeToEdit.name : null}
      >
      </input><br/>
      <textarea
        placeholder='Ingredients'
        ref={node => { newIngredients = node }}
        value={recipeToEdit ? recipeToEdit.ingredients : null}
      /><br/>
      <textarea 
        placeholder='Instructions'
        ref={node => { newInstructions = node }}
        value={recipeToEdit ? recipeToEdit.instructions : null}
      /><br/>
      <input type='text'
        placeholder='Recipe author'
        ref={node => { newAuthor = node }}
        value={recipeToEdit ? recipeToEdit.author : null}
      /><br/>
      <button
        type='button'
        onClick={onClick}
        className='cancel-edit'
      >
        Cancel edit
      </button><br/>
      <button
        type='submit'
        onClick={onClick}
        className='submit-edit'
      >
        Save recipe
      </button>
    </form>
  </div>
}
UpdateRecipe.propTypes = {
  onClick: PropTypes.func.isRequired
}
export {UpdateRecipe} 
