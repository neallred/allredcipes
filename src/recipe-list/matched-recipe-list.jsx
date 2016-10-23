import { connect } from 'react-redux'
import { toggleRecipe, fetchRecipes } from '../actions'
import { RECIPES_REQUEST } from '../actions'
import { RecipeList } from './recipe-list'

const actionToRecipeMap = {
  BY_ALL: 'all',
  BY_NAME: 'name',
  BY_INGREDIENTS: 'ingredients',
  BY_INSTRUCTIONS: 'instructions',
  BY_AUTHOR: 'author'
}

const getMatchedRecipes = (recipes,filters,searchTerms) => {
	const recipeMatcher = (currentRecipe, currentRecipeIndex, recipesArray) => {
		let recipeMatched = true;
		for(var i=0;i<filters.length;i++){
			for(var j=0;j<searchTerms.length;j++){
				let recipeProperty = actionToRecipeMap[filters[i]]
				recipeMatched = currentRecipe[recipeProperty].toLowerCase().indexOf(searchTerms[j]) !== -1
				if(recipeMatched === false){ break; }
			}
			if(recipeMatched === true){ break; }
		}
		return recipeMatched
	}
	return recipes.filter(recipeMatcher)
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
		},
		fetchRecipes: () => {
			dispatch(fetchRecipes())
		}
	}
}

const MatchedRecipeList = connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipeList)

export {MatchedRecipeList}
