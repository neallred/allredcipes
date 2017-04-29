import tape from 'tape'

import {
	HEADER_BUTTON_SELECT,
	HEADER_HANDLE_INPUT,
	HEADER_MEASURE_HEIGHT 
} from '../constants/action-types'

import {
  headerButtonSelect,
  headerHandleInput,
  headerMeasureHeight,
  header,
} from './ducks'

const reducer = header;

const test = tape

const initialState = {
  keyA: 'keyA',
  keyB: 'keyB',
}

test('Header ducks reducer', (t) => {

  t.test('default case returns prior state when type is unmatched', t => {
    t.plan(1)
    const reducerResult = reducer(initialState, {type: 'NONSENSE', value: {keyA: 'asdf'}})
    t.deepEqual(
      initialState,
      reducerResult
    )


  })
  t.test('HEADER_HANDLE_INPUT case saves inputFields, preserving other data', t => {
    const initialHandleInputState = {
      untouchedKey: 'untouchedKey',
      a: 'a',
      b: 'b',
      c: 'c',
      d: 'd',
    }
    const setup = [
      {type: HEADER_HANDLE_INPUT, value: {inputField: 'a', input: 'aa'}},
      {type: HEADER_HANDLE_INPUT, value: {inputField: 'b', input: 'bb'}},
      {type: HEADER_HANDLE_INPUT, value: {inputField: 'c', input: 'cc'}},
      {type: HEADER_HANDLE_INPUT, value: {inputField: 'd', input: 'dd'}},
    ]

    t.plan(setup.length * Object.keys(initialHandleInputState).length)

    setup.reduce((stateIterations, testAction) => {

      const reducerResult = reducer(stateIterations, testAction)

      const reducerKeys = Object.keys(reducerResult)

      reducerKeys.map(key => {
        if (key === testAction.value.inputField) {
          t.equal(reducerResult[key], testAction.value.input, `"${key}" key is updated when it is the inputField`)
        }
        else {
          t.equal(reducerResult[key], stateIterations[key], `"${key}" key is preserved when it is not inputField`)
        }
      })
      
      return reducerResult
    }, initialHandleInputState)
  })

  t.test('HEADER_BUTTON_SELECT sets buttonSelected key to action.value', t => {
    t.plan(1);

    const reducerResult = reducer(initialState, {type: HEADER_BUTTON_SELECT, value: 'button-identifier'})
    t.equal(reducerResult.buttonSelected, 'button-identifier');
    
  })
})

test('Header ducks action creators', (t) => {
  const setup = [
    {actionCreator: headerButtonSelect,  type: HEADER_BUTTON_SELECT, value: 'some data'},
    {actionCreator: headerHandleInput,  type: HEADER_HANDLE_INPUT, value: 'some data'},
    {actionCreator: headerMeasureHeight,  type: HEADER_MEASURE_HEIGHT, value: 'some data'},
  ]

  setup.map(testData => {
  t.test(`${testData.actionCreator.name} returns an action with type ${testData.type} and value ${testData.value}`, t => {
    t.plan(2)
    const createdAction = testData.actionCreator(testData.value)
    t.equal(
      createdAction.type,
      testData.type
    )
    t.equal(
      createdAction.value,
      testData.value
    )
  })
  })
})

