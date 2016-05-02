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
      if (e.currentTarget.className ==='cancel-edit') {
        dispatch(isEditing())
      }
      else if (e.currentTarget.className ==='submit-edit') {
        dispatch(updateRecipe(0, 'newHideIngredients.value', 'newName.value', 'newIngredients.value', 'newInstructions.value', 'newAuthor.value'))
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
