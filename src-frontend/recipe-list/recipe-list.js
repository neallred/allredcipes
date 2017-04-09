import React from 'react'
import PropTypes from 'prop-types';
import { RecipeCard } from '../recipe-card/recipe-card'
import './recipe-list.scss'

import { connect } from 'react-redux'
import * as RecipesActions from './ducks'
import { sessionCheckStatus } from '../session/ducks'

//const actionToRecipeMap = {
//  BY_ALL: 'all',
//  BY_NAME: 'name',
//  BY_INGREDIENTS: 'ingredients',
//  BY_INSTRUCTIONS: 'instructions',
//  BY_AUTHOR: 'author'
//}
//
//const getMatchedRecipes = (recipes,filters,searchTerms) => {
//	const recipeMatcher = (currentRecipe, currentRecipeIndex, recipesArray) => {
//		let recipeMatched = true;
//		for(var i=0;i<filters.length;i++){
//			for(var j=0;j<searchTerms.length;j++){
//				let recipeProperty = actionToRecipeMap[filters[i]]
//				recipeMatched = currentRecipe[recipeProperty].toLowerCase().indexOf(searchTerms[j]) !== -1
//				if(recipeMatched === false){ break; }
//			}
//			if(recipeMatched === true){ break; }
//		}
//		return recipeMatched
//	}
//	return recipes.filter(recipeMatcher)
//}
//recipes: getMatchedRecipes(state.recipes, state.setSearchFilters, state.setSearchTerms),

const matchStringInField = (field, string) => field.indexOf(string) !== -1

const matchAnyStringInField = (field, stringsArray) => {
	for(let i = 0; i < stringsArray.length; i = i + 1) {
		if(matchStringInField(field, stringsArray[i])) {
			return true
		}
	}
	return false
}

const matchAnySearchCategoryToField = (field, searchFilters) => {
	const searchFilterKeys = Object.keys(searchFilters)
	for(let i = 0 ; i < searchFilterKeys.length ; i = i + 1) {
		if(matchAnyStringInField(field, searchFilters[searchFilterKeys[i]])) {
			return true
		}
	}
	return false
}

const matchAnySearchCategoryToAnyField = (recipe, searchFilters) => {
	const recipeKeys = Object.keys(recipe)
	for(let i = 0 ; i < recipeKeys.length ; i = i + 1) {
		if ((typeof recipe[recipeKeys[i]] === 'string') && matchAnySearchCategoryToField(recipe[recipeKeys[i]], searchFilters)) {
			return true
		}
	}
	return false
}

const matchRecipes = (recipes, searchFilters) => {
	const filtersWithTerms = Object.keys(searchFilters).filter(currentFilter => {
		return Array.isArray(searchFilters[currentFilter]) && searchFilters[currentFilter].length
	})
	if (!filtersWithTerms.length){
		return recipes
	}
	const activeSearchFilters = {}
	filtersWithTerms.forEach(filter => activeSearchFilters[filter] = searchFilters[filter])
	let matchedRecipes = []
	recipes.forEach(recipe => {
		//needs a notion of active filters to be fed into matchAnySearchCategoryToAnyField
		if (matchAnySearchCategoryToAnyField(recipe, activeSearchFilters)) {
			matchedRecipes.push(recipe)
		}
	})
	return matchedRecipes
}


const mapStateToProps = (state) => {
	return {
		recipeList: matchRecipes(state.recipes.list, state.search),
		session: state.session
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		recipesGet: (page) => {
			dispatch(RecipesActions.recipesGet(page))
		},
    toggleView: (id) => dispatch(RecipesActions.recipesToggleView(id)),
		sessionCheckStatus: () => {
			dispatch(sessionCheckStatus())
		}
	}
}


export class RecipeList extends React.Component {

	componentWillMount() {
		this.props.recipesGet(0)
		this.props.sessionCheckStatus()
	}

	render() {
		const {recipeList, session} = this.props;
		return <div className='recipe-list'>
      {recipeList && recipeList.map(recipe => <RecipeCard {...recipe}
        key={recipe._id}
        recipeId={recipe._id}
        toggleView={this.props.toggleView}
        isLoggedIn={session && session.isLoggedIn} />)}
		</div>
	}
}

RecipeList.propTypes = {
	recipeList: PropTypes.arrayOf(PropTypes.shape({
		_id: PropTypes.any.isRequired,
		name: PropTypes.string.isRequired,
		ingredients: PropTypes.string,
		instructions: PropTypes.string,
		author: PropTypes.string
	}).isRequired).isRequired,
	recipesGet: PropTypes.func.isRequired
}

export default connect(
	mapStateToProps,
	mapDispatchToProps
)(RecipeList)
