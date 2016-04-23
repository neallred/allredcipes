import { connect } from 'react-redux'
import { toggleRecipe } from '../actions'
import { RecipeList } from '../components/RecipeList'

const getVisibleRecipes = (recipes, filter) => {
  switch (filter) {
    case 'SHOW_ALL':
      return recipes
    case 'SHOW_NAME':
      return recipes.filter(r => r.name)
    case 'SHOW_INGREDIENTS':
      return recipes.filter(r => r.ingredients)
    case 'SHOW_INSTRUCTIONS':
      return recipes.filter(r => r.ingredients)
    case 'SHOW_AUTHOR':
      return recipes.filter(r => r.author)
    default: 
      return recipes
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: getVisibleRecipes(state.recipes, state.visibilityFilter)
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    onRecipeClick: (id) => {
      dispatch(toggleRecipe(id))
    }
  }
}

const VisibleRecipeList = connect(
  mapStateToProps,
  mapDispatchToProps
)(RecipeList)

export {VisibleRecipeList}
