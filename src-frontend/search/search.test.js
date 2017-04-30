import React from 'react'
import {shallow} from 'enzyme'
import tape from 'tape'
import td from 'testdouble'

import register from 'ignore-styles'
register(['css', '.scss'])


const test = tape
const props = {
  search: {},
  headerHeight: 1
}


const cB = 'search'
import {Search} from './search'

test('<Search/>', (t) => {

  t.test('top margin is a number', t => {

    const setup = [
      NaN,
      '',
      {},
      [],
      0,
      2,
      '24',
      null,
      undefined,
      true,
      false,
    ]

    t.plan(setup.length)

    setup.forEach(testData => {
      const wrapper = shallow(<Search {...props} headerHeight={testData}/>)
      const searchTopMargin = wrapper.find(`.${cB}`).at(0).prop('style').marginTop
      const marginIsNumber = typeof searchTopMargin === 'number' && (!!searchTopMargin || searchTopMargin === 0)
      t.equal(
        marginIsNumber,
        true,
        `when given data ${JSON.stringify(testData)} of type ${typeof testData}`
      )
    })
  })

  t.test('renders one search line per search key passed', t => {
    const localProps = {
      search: {
        a: {},
        b: {},
        c: {},
        d: {},
      }
    }
    t.plan(1)
    const wrapper = shallow(<Search {...props} {...localProps}/>)

    t.equal(
      wrapper.find(`.${cB}__line`).length,
      Object.keys(localProps.search).length,
    )
  })

  t.test('renders no search line when there is no search object passed', t => {
    t.plan(1)
    const wrapper = shallow(<Search />)

    t.equal(
      wrapper.find(`.${cB}__line`).length,
      0,
    )
  })

  t.test('each search key with enabled flag as true shows its text line', t => {
    const localProps = {
      search: {
        a: {},
        b: {enabled: true},
        c: {enabled: true},
      }
    }
    t.plan(1)
    const wrapper = shallow(<Search {...props} {...localProps}/>)

    t.equal(
      wrapper.find(`.${cB}__text`).length,
      2,
    )
  })

  t.test('each search key with enabled flag shows a checked box', t => {
    const localProps = {
      search: {
        a: {enabled: true},
        b: {enabled: true},
      }
    }
    t.plan(1)

    const wrapper = shallow(<Search {...props} {...localProps}/>)

    t.equal(
      wrapper.find(`.${cB}__checkbox`).every('[checked=true]'),
      true,
    )
  })

  t.test('each search key with enabled flag as false has an unchecked box', t => {
    const localProps = { search: { a: {}} }
    t.plan(1)
    const wrapper = shallow(<Search {...props} {...localProps}/>)

    t.equal(
      wrapper.find(`.${cB}__checkbox`).every('[checked=true]'),
      false,
    )
  })

  t.test('enabled search key line has its terms property as its input value', t => {
    const localProps = {
      search: {
        a: {enabled: true, terms: 'goats'},
        b: {enabled: true, terms: 'hamsters'},
      }
    }
    t.plan(2)
    const wrapper = shallow(<Search {...props} {...localProps}/>)

    t.equal(
      wrapper.find(`.${cB}__text`).at(0).prop('value'),
      'goats',
    )

    t.equal(
      wrapper.find(`.${cB}__text`).at(1).prop('value'),
      'hamsters',
    )
  })

  t.test('search type checkmark toggles search type when clicked', t => {
    const localProps = { search: { a: {enabled: false, terms: ''}}, searchToggleType: td.function()}
    t.plan(1)
    const wrapper = shallow(<Search {...props} {...localProps}/>)
    const checkbox = wrapper.find(`.${cB}__checkbox`).at(0);

    checkbox.simulate('click')
    const searchToggleCalls = td.explain(localProps.searchToggleType).calls

    t.deepEqual(
      searchToggleCalls[0].args,
      ['a'],
    )
    td.reset()
  })

  t.test('search text box calls searchUpdateTerms with search type and new search type text when changed', t => {
    const localProps = { search: { a: {enabled: true, terms: ''}}, searchUpdateTerms: td.function()}
    t.plan(1)
    const wrapper = shallow(<Search {...props} {...localProps}/>)
    const input = wrapper.find(`.${cB}__text`).at(0);

    input.simulate('change', {target: {value: 'bob'}})
    const searchUpdateCalls = td.explain(localProps.searchUpdateTerms).calls

    t.deepEqual(
      searchUpdateCalls[0].args,
      ['a', 'bob'],
    )
    td.reset()
  })
})
