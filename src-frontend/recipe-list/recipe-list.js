import React from 'react'
import PropTypes from 'prop-types';
import { RecipeCard } from '../recipe-card/recipe-card'
import './recipe-list.scss'

import { connect } from 'react-redux'
import * as RecipesActions from './ducks'
import { sessionCheckStatus } from '../session/ducks'
import { filterRecipes } from './filter-recipes'

const mapStateToProps = (state) => {
	return {
		recipeList: filterRecipes(state.recipes.list, state.search),
		session: state.session
	}
}

const mapDispatchToProps = (dispatch) => {
	return {
		recipesGet: (page) => {
			dispatch(RecipesActions.recipesGet(page))
		},
    toggleView: (id) => dispatch(RecipesActions.recipesToggleView(id)),
    toggleRecipeEdit: (id) => dispatch(RecipesActions.recipesToggleEdit(id)),
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
        toggleRecipeEdit={this.props.toggleRecipeEdit}
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
