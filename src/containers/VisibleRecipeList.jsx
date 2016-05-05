import { connect } from 'react-redux'
import { toggleRecipe } from '../actions'
import { RecipeList } from '../components/RecipeList'

const getMatchedRecipes = (recipes, searchFilters, terms) => {
  switch (searchFilters[0]) {
    case 'BY_ALL':
      console.log('returning by_all')
      return recipes.filter(r => (r.name.indexOf(terms[0]) !== -1)
                              || (r.ingredients.indexOf(terms[0]) !== -1)
                              || (r.instructions.indexOf(terms[0]) !== -1)
                              || (r.author.indexOf(terms[0]) !== -1)
                            )
    case 'BY_NAME':
      console.log('returning by_name')
      return recipes.filter(r => (r.name.indexOf(terms[0]) !== -1))
    case 'BY_INGREDIENTS':
      console.log('returning by_ingredients')
      return recipes.filter(r => (r.ingredients.indexOf(terms[0]) !== -1))
    case 'BY_INSTRUCTIONS':
      console.log('returning by_instructions')
      return recipes.filter(r => (r.instructions.indexOf(terms[0]) !== -1))
    case 'BY_AUTHOR':
      console.log('returning by_author')
      return recipes.filter(r => (r.author.indexOf(terms[0]) !== -1))
    default: 
      console.log('returning default')
      return recipes
  }
}

const mapStateToProps = (state) => {
  return {
    recipes: getMatchedRecipes(state.recipes, state.setSearchFilters, state.setSearchTerms)
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
