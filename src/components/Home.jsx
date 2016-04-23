import React from 'react'
import { Footer } from './Footer'
import { CreateRecipe } from '../containers/CreateRecipe'
import { VisibleRecipeList } from '../containers/VisibleRecipeList.jsx'

export const Home = () => (
  <div>
    <CreateRecipe />
    <VisibleRecipeList />
    <Footer />
  </div>
)
