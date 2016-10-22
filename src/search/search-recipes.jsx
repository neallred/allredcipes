import React from 'react'
import { FilterCheckbox } from '../checkbox/filter-checkbox'
import { UpdateSearchTerms } from '../search/update-search-terms'

export const SearchRecipes = () => (
	<div className='center-block text-center'>
		<h2>Search recipes by:</h2>
		<form className='search-form'>
			<FilterCheckbox filter='BY_NAME' labelName='Name'/>
			<FilterCheckbox filter='BY_INGREDIENTS' labelName='Ingredients'/>
			<FilterCheckbox filter='BY_INSTRUCTIONS' labelName='Instructions'/>
			<FilterCheckbox filter='BY_AUTHOR' labelName='Author/Contributor'/><br/>
			<UpdateSearchTerms/>
		</form>
	</div>
)
// <FilterCheckbox filter='BY_ALL' labelName='All'/>
