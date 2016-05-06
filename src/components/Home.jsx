import React from 'react'
import { SearchRecipes } from './SearchRecipes'
import { CreateRecipe } from '../containers/CreateRecipe'
import { UpdateRecipeContainer } from '../containers/UpdateRecipeContainer.jsx'
import { MatchedRecipeList } from '../containers/MatchedRecipeList.jsx'

export const Home = () => (
  <div>
    <h1 className='center-block'>Open Source Recipe Box</h1>
    <SearchRecipes />
    <MatchedRecipeList />
    <CreateRecipe />
    <UpdateRecipeContainer />
  </div>
)
