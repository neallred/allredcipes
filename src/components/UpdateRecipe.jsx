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
        Save recipe{console.log(recipeToEdit)}
      </button>
    </form>
  </div>
}
UpdateRecipe.propTypes = {
  onClick: PropTypes.func.isRequired
}
/*have this container receive data as props from edit button,
* or at least as result of pushing that button*/
export {UpdateRecipe} 
