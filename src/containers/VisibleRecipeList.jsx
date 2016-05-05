import { connect } from 'react-redux'
import { toggleRecipe } from '../actions'
import { RecipeList } from '../components/RecipeList'

const getMatchedRecipes = (recipes, searchFilters, terms) => {
  switch (searchFilters[0]) {
    case 'BY_ALL':
      if(terms.length < 1){ return recipes }
      console.log('returning by_all')
      return recipes.filter(r => (r.name.toLowerCase().indexOf(terms[0]) !== -1)
                              || (r.ingredients.toLowerCase().indexOf(terms[0]) !== -1)
                              || (r.instructions.toLowerCase().indexOf(terms[0]) !== -1)
                              || (r.author.toLowerCase().indexOf(terms[0]) !== -1)
                            )
    case 'BY_NAME':
      if(terms.length < 1){ return recipes }
      console.log('returning by_name')
      return recipes.filter(r => (r.name.toLowerCase().indexOf(terms[0]) !== -1))
    case 'BY_INGREDIENTS':
      if(terms.length < 1){ return recipes }
      console.log('returning by_ingredients')
      return recipes.filter(r => (r.ingredients.toLowerCase().indexOf(terms[0]) !== -1))
    case 'BY_INSTRUCTIONS':
      if(terms.length < 1){ return recipes }
      console.log('returning by_instructions')
      return recipes.filter(r => (r.instructions.toLowerCase().indexOf(terms[0]) !== -1))
    case 'BY_AUTHOR':
      if(terms.length < 1){ return recipes }
      console.log('returning by_author')
      return recipes.filter(r => (r.author.toLowerCase().indexOf(terms[0]) !== -1))
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
