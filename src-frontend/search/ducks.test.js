import tape from 'tape'

import {
	SEARCH_UPDATE_TERMS,
	SEARCH_TOGGLE,
} from '../constants/action-types'

import {
  searchToggleType,
  searchUpdateTerms,
  defaultState,

  searchReducer,
} from './ducks'

const test = tape

const initialState = {
  keyA: 'keyA',
  keyB: 'keyB',
}

test('Header ducks reducer', (t) => {

  t.test('default case returns prior state when type is unmatched', t => {
    t.plan(1)
    const reducerResult = searchReducer(initialState, {type: 'NONSENSE', value: {keyA: 'asdf'}})
    t.deepEqual(
      initialState,
      reducerResult
    )
  })

  t.test('reducer has default state with "contributor", "ingredients", "instructions", and "name" keys', t => {
    t.plan(1)
    const reducerResult = searchReducer(undefined, {type: 'NONSENSE', value: {keyA: 'asdf'}})
    const actualKeys = Object.keys(reducerResult).sort()
    const expectedInitialKeys = ["contributor", "ingredients", "instructions", "name"] 
    t.deepEqual(
      actualKeys,
      expectedInitialKeys
    )
  })

  t.test('SEARCH_UPDATE_TERMS case saves passed key, preserving other data', t => {
    const initialSearchState = {
      untouchedKey: 'untouchedKey',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
    }
    const setup = [
      {type: SEARCH_UPDATE_TERMS, value: {key: 'a', terms: 'aa'}},
      {type: SEARCH_UPDATE_TERMS, value: {key: 'b', terms: 'bb'}},
      {type: SEARCH_UPDATE_TERMS, value: {key: 'c', terms: 'cc'}},
      {type: SEARCH_UPDATE_TERMS, value: {key: 'd', terms: 'dd'}},
    ]

    t.plan(setup.length * Object.keys(initialSearchState).length)

    setup.reduce((stateIterations, testAction) => {

      const reducerResult = searchReducer(stateIterations, testAction)

      const reducerKeys = Object.keys(reducerResult)

      reducerKeys.map(key => {
        if (key === testAction.value.key) {
          t.equal(reducerResult[key].terms, testAction.value.terms, `"${key}" terms are updated when it is the key`)
        }
        else {
          t.equal(reducerResult[key].terms, stateIterations[key].terms, `"${key}" terms are preserved when it is not key`)
        }
      })
      
      return reducerResult
    }, initialSearchState)
  })


  t.test('SEARCH_TOGGLE toggles term, preserving terms value and all other search keys', t => {
    const initialSearchState = {
      untouchedKey: 'untouchedKey',
      a: {
        enabled: true,
        terms: 'a',
      },
      b: {
        enabled: true,
        terms: 'b',
      },
      c: {
        enabled: true,
        terms: 'c',
      },
      d: {
        enabled: true,
        terms: 'd',
      },
    }

    const setup = [
      {type: SEARCH_TOGGLE, value: 'a'},
      {type: SEARCH_TOGGLE, value: 'b'},
      {type: SEARCH_TOGGLE, value: 'c'},
      {type: SEARCH_TOGGLE, value: 'd'},
    ]

    t.plan(setup.length * Object.keys(initialSearchState).length)

    setup.reduce((stateIterations, testAction) => {

      const reducerResult = searchReducer(stateIterations, testAction)

      const reducerKeys = Object.keys(reducerResult)

      reducerKeys.map(key => {
        if (key === testAction.value) {
          t.deepEqual(
            reducerResult[key],
            {
              enabled: !stateIterations[key].enabled,
              terms: stateIterations[key].terms
            },
            `"${key}" is toggled and terms are preserved when it is key`
          )
        }
        else {
          t.deepEqual(reducerResult[key], stateIterations[key], `"${key}" terms are preserved when it is not key`)
        }
      })
      
      return reducerResult
    }, initialSearchState)
  })

  //  t.test('HEADER_BUTTON_SELECT sets buttonSelected key to action.value', t => {
  //    t.plan(1)
  //
  //    const reducerResult = reducer(initialState, {type: HEADER_BUTTON_SELECT, value: 'button-identifier'})
  //    t.equal(reducerResult.buttonSelected, 'button-identifier')
  //    
  //  })
})

test('Header ducks action creators', (t) => {
  const setup = [
    {actionCreator: searchToggleType,  type: SEARCH_TOGGLE},
    {actionCreator: searchUpdateTerms,  type: SEARCH_UPDATE_TERMS},
  ]

  setup.map(testData => {
    t.test(`${testData.actionCreator.name} returns an action with type ${testData.type}`, t => {
      t.plan(1)
      const createdAction = testData.actionCreator(testData.value)
      t.equal(
        createdAction.type,
        testData.type
      )
    })
  })
})


