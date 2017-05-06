import tape from 'tape'

import {
  RECIPES_GET,
  RECIPES_GET_SUCCESS,
  RECIPES_GET_FAILURE,
  RECIPES_CREATE,
  RECIPES_CREATE_SUCCESS,
  RECIPES_CREATE_FAILURE,
  RECIPES_UPDATE,
  RECIPES_UPDATE_SUCCESS,
  RECIPES_UPDATE_FAILURE,
  RECIPES_DELETE,
  RECIPES_DELETE_SUCCESS,
  RECIPES_DELETE_FAILURE,

  RECIPES_TOGGLE_VIEW,
  RECIPES_TOGGLE_EDIT,
  RECIPES_HANDLE_EDIT,
  RECIPES_TOGGLE_CREATE,
  RECIPES_HANDLE_CREATE,
} from '../constants/action-types'

import {
  //action creators
  recipesDelete,
  recipesToggleView,
  recipesToggleEdit,
  recipesHandleEdit,
  recipesToggleCreate,
  recipesHandleCreate,
  recipesGet,
  recipesUpdate,

  //initialState
  recipesInitialState,
  initialEditState,

  //helpers
  mergeRecipesBy,
} from './ducks'
import recipes from './ducks'
const recipesReducer = recipes 


const test = tape

const initialState = {
  keyA: 'keyA',
  keyB: 'keyB',
}

test('Header ducks reducer', (t) => {

  t.test('default case returns prior state when type is unmatched', t => {
    t.plan(1)
    const reducerResult = recipesReducer(initialState, {type: 'NONSENSE', value: {keyA: 'asdf'}})
    t.deepEqual(
      initialState,
      reducerResult
    )
  })

  t.test('reducer default state with has inital needed keys', t => {

    t.plan(1)
    const reducerResult = recipesReducer(undefined, {type: 'NONSENSE', value: {keyA: 'asdf'}})
    const actualKeys = Object.keys(reducerResult).sort()
    const expectedInitialKeys = Object.keys(recipesInitialState).sort()
    t.deepEqual(
      actualKeys,
      expectedInitialKeys
    )
  })

t.test('RECIPES_GET_SUCCESS case', (t) => {
  const notPreserved = 'not preserved'
  const preserved = 'preserved'
  const newValue = 'new value'

  const localState = {
    list: [
      {_id: 'a1', name: preserved, ingredients: preserved},
      {_id: 'a2', name: notPreserved, ingredients: notPreserved},
      {_id: 'a3', name: notPreserved, ingredients: notPreserved},
    ],
    errorGet: true,
  }
  const localAction = {
    type: RECIPES_GET_SUCCESS,
    value: [
      {_id: 'a2'},
      {_id: 'a3', name: newValue, ingredients: newValue},
      {_id: 'a4', name: newValue, ingredients: newValue},
      {_id: 'a0', name: newValue, ingredients: newValue},
    ],
  }
  t.plan(2);

  const reducerResult = recipesReducer(localState, localAction);

  t.deepEqual(
    reducerResult.list,
    [
      {_id: 'a1', name: preserved, ingredients: preserved},
      {_id: 'a2'},
      {_id: 'a3', name: newValue, ingredients: newValue},
      {_id: 'a4', name: newValue, ingredients: newValue},
      {_id: 'a0', name: newValue, ingredients: newValue},
    ],
    'merges recipes, overwriting matched recipes and preserving old and unmatched recipes',
  )

  t.equal(
    reducerResult.errorGet,
    null,
    'sets errorGet to null',
  );
})

  t.test('RECIPES_GET_FAILURE case', t => {

    t.plan(1)
    const reducerResult = recipesReducer(undefined, {type: RECIPES_GET_FAILURE, value: 'fail value'})
    t.equal(
      reducerResult.errorGet,
      'fail value'
    )
  })
//
//
//  //  t.test('HEADER_BUTTON_SELECT sets buttonSelected key to action.value', t => {
//  //    t.plan(1)
//  //
//  //    const reducerResult = reducer(initialState, {type: HEADER_BUTTON_SELECT, value: 'button-identifier'})
//  //    t.equal(reducerResult.buttonSelected, 'button-identifier')
//  //    
//  //  })
})

test('mergeRecipesBy', (t) => {
  const notPreserved = 'not preserved'
  const preserved = 'preserved'
  const newValue = 'new value'
  const oldRecipes = [
    {_id: 'a1', name: preserved, ingredients: preserved},
    {_id: 'a2', name: notPreserved, ingredients: notPreserved},
    {_id: 'a3', name: notPreserved, ingredients: notPreserved},
  ]

  const fetchedRecipes = [
    {_id: 'a2'},
    {_id: 'a3', name: newValue, ingredients: newValue},
    {_id: 'a4', name: newValue, ingredients: newValue},
    {_id: 'a0', name: newValue, ingredients: newValue},
  ]
  const byTerm = '_id'

  //helper method mutates
  const mergedRecipes = mergeRecipesBy(oldRecipes, JSON.parse(JSON.stringify(fetchedRecipes)), byTerm)
  function getRecipe(recipeList, value, byTerm='_id') {
    return recipeList.find(recipe => recipe[byTerm] === value)
  }

  t.test('old recipes are preserved', t => {
    t.plan(1)
    t.deepEqual( mergedRecipes[0], getRecipe(oldRecipes, 'a1'))
  })

  t.test('matched recipes are completely replaced by the newer version', t => {
    t.plan(2)
    t.deepEqual( mergedRecipes[1], getRecipe(fetchedRecipes, 'a2'))
    t.deepEqual( mergedRecipes[2], getRecipe(fetchedRecipes, 'a3'))
  })

  t.test('new recipes are appended', t => {
    t.plan(2)
    t.deepEqual( mergedRecipes[3], getRecipe(fetchedRecipes, 'a4'))
    t.deepEqual( mergedRecipes[4], getRecipe(fetchedRecipes, 'a0'))
  })
})

test('RecipeList ducks action creators', (t) => {
  const setup = [
    {actionCreator: recipesDelete, type: RECIPES_DELETE},
    {actionCreator: recipesToggleView, type: RECIPES_TOGGLE_VIEW},
    {actionCreator: recipesToggleEdit, type: RECIPES_TOGGLE_EDIT},
    {actionCreator: recipesHandleEdit, type: RECIPES_HANDLE_EDIT},
    {actionCreator: recipesToggleCreate, type: RECIPES_TOGGLE_CREATE},
    {actionCreator: recipesHandleCreate, type: RECIPES_HANDLE_EDIT},
    {actionCreator: recipesGet, type: RECIPES_GET},
    {actionCreator: recipesUpdate, type: RECIPES_UPDATE},
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



