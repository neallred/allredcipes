import React from 'react'
import { SearchRecipes } from './SearchRecipes'
import { CreateRecipe } from '../components/CreateRecipe'
import { UpdateRecipeContainer } from '../containers/UpdateRecipeContainer.jsx'
import { MatchedRecipeList } from '../containers/MatchedRecipeList.jsx'

export const Home = () => (
  <div>
    <div className='banner center-block'>
      <h1 className='center-block'>Allred Recipe Box</h1>
      <SearchRecipes />
    </div>
    <MatchedRecipeList />
    <CreateRecipe
      onSubmit={(formValues) => console.log(formValues)}
    />
    <UpdateRecipeContainer />
    <br/>
  </div>
)
