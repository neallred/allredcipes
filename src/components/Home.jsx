import React from 'react'
import { SearchRecipes } from './SearchRecipes'
import { CreateRecipeContainer } from '../containers/CreateRecipeContainer'
import { UpdateRecipeContainer } from '../containers/UpdateRecipeContainer'
import { MatchedRecipeList } from '../containers/MatchedRecipeList.jsx'

export const Home = () => (
  <div>
    <div className='banner center-block'>
      <h1 className='center-block'>Allred Recipe Box</h1>
      <SearchRecipes />
    </div>
    <MatchedRecipeList />
    <CreateRecipeContainer />
    <UpdateRecipeContainer />
    <br/>
  </div>
)
