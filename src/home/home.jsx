import React from 'react'
import { connect } from 'react-redux'
import { SearchRecipes } from '../search/search-recipes'
import { CreateRecipeContainer } from '../create-recipe/create-recipe-container'
import { UpdateRecipeContainer } from '../update-recipe/update-recipe-container'
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
		<div className='banner center-block'>
			<h1 className='center-block'>Allred Recipe Box</h1>
			<SearchRecipes />
		</div>
		<MatchedRecipeList />
		{session.isLoggedIn && <CreateRecipeContainer />}
		<UpdateRecipeContainer updateFields={updateFields}/>
		<br/>
	</div>
)

const Home = connect(mapStateToProps)(HomeComponent);
export {Home}
