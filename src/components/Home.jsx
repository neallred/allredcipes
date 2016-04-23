import React from 'react'
import { Footer } from './Footer'
import { CreateRecipe } from '../containers/CreateRecipe'
import { VisibleRecipeList } from '../containers/VisibleRecipeList.jsx'

export const Home = () => (
  <div>
    <h1 className='center-block'>Open Source Recipe Box</h1>
    <VisibleRecipeList />
    <CreateRecipe />
    <Footer />
  </div>
)
