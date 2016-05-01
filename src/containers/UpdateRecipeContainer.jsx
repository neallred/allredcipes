import { connect } from 'react-redux'
import { isEditing } from '../actions'
import { updateRecipe } from '../actions'
import { UpdateRecipe } from '../components/UpdateRecipe'

const mapStateToProps = (state, ownProps) => {
  return { isEditing: state.isEditing,
           recipeToEdit: state.isEditing ? state.recipes[4] : null
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
        dispatch(updateRecipe(4, 'inputName.value', 'inputIngredients.value', 'inputInstructions.value', 'inputAuthor.value', 'adsf'))
      }
    }
  }
}



export const UpdateRecipeContainer = connect(
  mapStateToProps,
  mapDispatchToProps
)(UpdateRecipe)


/*
        dispatch(updateRecipe(inputName.value, inputIngredients.value, inputInstructions.value, inputAuthor.value))
  dispatch(updateRecipe(ownProps.filter))
*/
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
