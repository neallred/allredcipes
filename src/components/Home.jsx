import React from 'react'
import { SearchRecipes } from './SearchRecipes'
import { CreateRecipeContainer } from '../containers/CreateRecipeContainer'
import { UpdateRecipeContainer } from '../containers/UpdateRecipeContainer.jsx'
import { MatchedRecipeList } from '../containers/MatchedRecipeList.jsx'

export const Home = () => (
  <div>
    <h1 className='center-block'>Allred Recipe Box</h1>
    <SearchRecipes />
    <MatchedRecipeList />
    <CreateRecipeContainer />
    <UpdateRecipeContainer />
    <br/>
  </div>
)
