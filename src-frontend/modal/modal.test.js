import React from 'react'
import {shallow} from 'enzyme'
import tape from 'tape'

import register from 'ignore-styles'
register(['css', '.scss'])


const test = tape
const props = {
  isOpen: true
}

const cB = 'modal-dialog';
import {Modal} from './modal'

test('<Modal/>', (t) => {

  t.test('rendersChildren', t => {
    const wrapper = shallow(<Modal {...props} children={[<nav key={1}>tag1</nav>, <nav key={2}>tag2</nav>]}/>)
    t.plan(3)
    t.equal(
      wrapper.find('nav').length,
      2,
      'renders all children'
    )
    t.equal(
      wrapper.find('nav').at(0).text(),
      'tag1',
      'shows first tag including its inner content',
    )
    t.equal(
      wrapper.find('nav').at(1).text(),
      'tag2',
      'shows second tag including its inner content',
    )
  })

  t.test('does appropriate thing in following circumstances', t => {
    const setup = [
      {isOpen: true, modifier: 'open'},
      {isOpen: false, modifier: 'closed'},
    ]


    t.plan(setup.length)
    setup.map(testData => {
      const localProps = {
        isOpen: testData.isOpen
      }
      const wrapper = shallow(<Modal {...props} {...localProps}/>)
      t.equal(
        wrapper.find(`.${cB}--${testData.modifier}`).length,
        1,
        `shows modal as ${testData.modifier} when isOpen flag is ${testData.isOpen}` 
      )
    })
  })
})
