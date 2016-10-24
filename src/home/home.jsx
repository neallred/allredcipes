import React from 'react'
import { SearchRecipes } from '../search/search-recipes'
import { CreateRecipeContainer } from '../create-recipe/create-recipe-container'
import { UpdateRecipeContainer } from '../update-recipe/update-recipe-container'
import { MatchedRecipeList } from '../recipe-list/matched-recipe-list'

export const Home = ({
	updateFields
}) => (
	<div>
		<div className='banner center-block'>
			<h1 className='center-block'>Allred Recipe Box</h1>
			<SearchRecipes />
		</div>
		<MatchedRecipeList />
		<CreateRecipeContainer />
		<UpdateRecipeContainer updateFields={updateFields}/>
		<br/>
	</div>
)
