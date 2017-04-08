import React from 'react'
import { connect } from 'react-redux'
//import { SearchRecipes } from '../search/search-recipes'
import { SearchContainer } from '../search/search-container'
import { RecipeFormContainer } from '../recipe-form/recipe-form-container'
import RecipeList from '../recipe-list/recipe-list'
import { HeaderContainer } from '../header/header-container'

const mapStateToProps = (state, ownProps) => {
	return {
		session: state.session
	}
}

export const HomeComponent = ({
	updateFields,
	session
}) => (
	<div>
		<HeaderContainer />
		<SearchContainer />
		<RecipeList />
		{session.isLoggedIn && <RecipeFormContainer updateFields={updateFields}/>}
		<br/>
	</div>
)

export default connect(mapStateToProps)(HomeComponent);
