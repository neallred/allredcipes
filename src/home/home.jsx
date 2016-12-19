import React from 'react'
import { connect } from 'react-redux'
//import { SearchRecipes } from '../search/search-recipes'
import { SearchContainer } from '../search/search-container'
import { RecipeFormContainer } from '../recipe-form/recipe-form-container'
import { MatchedRecipeList } from '../recipe-list/matched-recipe-list'
import { HeaderContainer } from '../header/header-container'

const mapStateToProps = (state, ownProps) => {
	return {
		session: state.session
	}
}

const HomeComponent = ({
	updateFields,
	session
}) => (
	<div>
		<HeaderContainer />
		<SearchContainer />
		<MatchedRecipeList />
		{session.isLoggedIn && <RecipeFormContainer updateFields={updateFields}/>}
		<br/>
	</div>
)

const Home = connect(mapStateToProps)(HomeComponent);
export {Home}
