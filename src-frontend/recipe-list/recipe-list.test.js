import React from 'react'
import {shallow} from 'enzyme'
import tape from 'tape'

import register from 'ignore-styles'
register(['css', '.scss'])


const test = tape
const props = {
  recipeList: [],
  recipesGet: ()=>{},
  sessionCheckStatus: ()=>{},
}
import td from 'testdouble'


import {RecipeList} from './recipe-list'
import { RecipeCard } from '../recipe-card/recipe-card'

test('<RecipeList/>', (t) => {

  t.test('renders one RecipeCard per item in recipeList', t => {
    const recipeList = [
      { _id: '', name: '', },
      { _id: '', name: '', },
      { _id: '', name: '', },
      { _id: '', name: '', },
      { _id: '', name: '', },
    ]
    const wrapper = shallow(<RecipeList {...props} recipeList={recipeList} />)
    t.plan(1)
    t.equal(
      wrapper.find(RecipeCard).length,
      5,
    )
  })

    t.test('componentWillMount', t => {
      const localProps = {
        recipesGet: td.function(),
        sessionCheckStatus: td.function()
      }
      const wrapper = shallow(<RecipeList {...props} {...localProps}/>)
      const comp = wrapper.instance();
      const initialGetCalls = td.explain(localProps.recipesGet).calls.length;
      const initialCheckStatusCalls = td.explain(localProps.sessionCheckStatus).calls.length;
  
      t.plan(2)
      t.notEqual (
        initialGetCalls,
        0,
      )
      t.notEqual (
        initialCheckStatusCalls,
        0,
      )
      td.reset()
    })
})
