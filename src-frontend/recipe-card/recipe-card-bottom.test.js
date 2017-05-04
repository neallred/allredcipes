
import React from 'react'
import {shallow} from 'enzyme'
import tape from 'tape'

import register from 'ignore-styles'
register(['css', '.scss'])


const test = tape
const props = {
  ingredients: 'ingredientsString',
  instructions: 'instructionsString',
  author: 'authorString',
  showIngredients: true,
}


import {RecipeCardBottom} from './recipe-card-bottom'
import {RecipeSubsection} from './recipe-subsection'

const cE = 'recipe__bottom';
test('<RecipeCardBottom/>', (t) => {

  t.test('hides content when showIngredients is false', t => {
    const wrapper = shallow(<RecipeCardBottom {...props} showIngredients={false}/>)
    t.plan(1)
    t.equal(
      wrapper.find(`.${cE}--hide`).length,
      1,
    )
  })

  t.test('shows content when showIngredients is true', t => {
    const wrapper = shallow(<RecipeCardBottom {...props} showIngredients={true}/>)
    t.plan(1)
    t.equal(
      wrapper.find(`.${cE}--show`).length,
      1,
    )
  })

  t.test('renders the three subsections in order', t => {

    const localProps = {
    }

    const setup = [
      ['Ingredients', props.ingredients],
      ['Instructions', props.instructions],
      ['Author/Contributor', props.author],
    ]

    const wrapper = shallow(<RecipeCardBottom {...props} {...localProps}/>)

    t.plan(setup.length * 2)
    setup.forEach((testData, i) => {
      const subsection = wrapper.find(RecipeSubsection).at(i);

      t.equal(
        subsection.prop('sectionTitle'),
        testData[0],
        `subsection ${i + 1} has title ${testData[0]}` 
      )

      t.equal(
        subsection.prop('dataToSanitize'),
        testData[1],
        `subsection ${i + 1} sanitizes ${testData[1]}` 
      )
    })
  })
})
