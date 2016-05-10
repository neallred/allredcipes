import { connect } from 'react-redux'
import { isEditing } from '../actions'
import { updateRecipe } from '../actions'
import { UpdateRecipe } from '../components/UpdateRecipe'

const mapStateToProps = (state, ownProps) => {
  let toEditId = state.isEditing ? state.isEditing.recipeToEdit.id : null
  return {
    isEditing: state.isEditing,
    recipeToEdit: state.recipes[toEditId]
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    onClick: (e) => {
      e.preventDefault()
      if (e.currentTarget.id ==='cancel-edit') {
        dispatch(isEditing())
      }
      else if (e.currentTarget.id ==='submit-edit') {
        let newId = parseInt(document.getElementById('updateId').value,10)
        let newHideIngredients = document.getElementById('updateHideIngredients').value
        let newName = document.getElementById('updateName').value
        let newIngredients = document.getElementById('updateIngredients').value
        let newInstructions = document.getElementById('updateInstructions').value
        let newAuthor = document.getElementById('updateAuthor').value
        dispatch(updateRecipe(newId, newHideIngredients, newName, newIngredients, newInstructions, newAuthor))
        dispatch(isEditing())
      }
    }
  }
}



export const UpdateRecipeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateRecipe)

/*
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
  //dispatch(isEditing())
*/
