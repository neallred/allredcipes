import tape from 'tape'

import {
  RECIPES_GET,
  RECIPES_GET_SUCCESS,
  RECIPES_GET_FAILURE,
  RECIPES_CREATE,
  RECIPES_CREATE_SUCCESS,
  RECIPES_CREATE_FAILURE,
  RECIPES_EDIT,
  RECIPES_EDIT_SUCCESS,
  RECIPES_EDIT_FAILURE,
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
  recipesEdit,

  //initialState
  recipesInitialState,
  initialEditState,

  //helpers
  mergeRecipesBy,
} from './ducks'
import recipes from './ducks'
const recipesReducer = recipes 


const test = tape
const notPreserved = 'not preserved'
const preserved = 'preserved'

const initialState = {
  keyA: 'keyA',
  keyB: 'keyB',
}

test('Recipe List ducks reducer', (t) => {

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
    t.plan(2)

    const reducerResult = recipesReducer(localState, localAction)

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
    )
  })

  t.test('RECIPES_GET_FAILURE case', t => {

    t.plan(1)
    const reducerResult = recipesReducer(undefined, {type: RECIPES_GET_FAILURE, value: 'fail value'})
    t.equal(
      reducerResult.errorGet,
      'fail value'
    )
  })

  t.test('RECIPES_CREATE_SUCCESS case', t => {

    const initialStateSetup = {
      list: [
        {_id: '0', name: '0'},
      ]
    }

    const setup = [
      {type: RECIPES_CREATE_SUCCESS, value: {_id: '0', name: '0'}},
      {type: RECIPES_CREATE_SUCCESS, value: {_id: '0', name: '1'}},
      {type: RECIPES_CREATE_SUCCESS, value: {_id: '1', name: '1'}},
      {type: RECIPES_CREATE_SUCCESS, value: {_id: '2', name: '2'}},
    ]

    t.plan(setup.length * 2)

    setup.reduce((stateIterations, testAction) => {
      stateIterations.errorCreate = true

      const reducerResult = recipesReducer(stateIterations, testAction)

      t.deepEqual(
        reducerResult.list,
        [...stateIterations.list, testAction.value],
        'appends newly added recipe'
      )

      t.equal(
        reducerResult.errorCreate,
        null,
        'sets errorCreate to null',
      )

      return reducerResult
    }, initialStateSetup)
  })

  t.test('RECIPES_CREATE_FAILURE case', t => {

    const initialStateSetup = {
      list: preserved,
      recipeEdit: preserved,
      errorGet: preserved,
      errorCreate: notPreserved,
      errorDelete: preserved,
      errorEdit: preserved,
    }

    const localAction = {type: RECIPES_CREATE_FAILURE, value: 'new value'}
    const reducerResult = recipesReducer(initialStateSetup, localAction)
    const stateKeys = Object.keys(initialStateSetup)
    t.plan(stateKeys.length)

    stateKeys.forEach(key => {
      if (initialStateSetup[key] === preserved) {
        t.equal(
          reducerResult[key],
          preserved,
          `preserves ${key} reducer key`
        )
      }
      else {
        t.equal(
          reducerResult[key],
          localAction.value,
          `sets ${key} reducer key to action.value`
        )
      }
    })
  })

  t.test('RECIPES_EDIT_SUCCESS case', t => {
    const localState = {
      list: [
        { _id: '0', name: '0', },
        { _id: '1', name: '1', author: 'author', ingredients: 'ingredients', instructions: 'instructions'},
        { _id: '2', name: '2', },
      ],
      errorEdit: true
    }
    const localAction = {
      type: RECIPES_EDIT_SUCCESS,
      value: {
        _id: '1',
        name: 'bob cakes',
        author: 'bob',
      }
    }

    const reducerResult = recipesReducer(localState, localAction)

    t.plan(5)

    t.equal(
      reducerResult.list.length,
      localState.list.length,
      'does not add or subtract recipes'
    )

    t.deepEqual(
      reducerResult.list[0],
      localState.list[0],
      'does not edit recipes not in the edit'
    )

    t.deepEqual(
      reducerResult.list[2],
      localState.list[2],
      'does not edit recipes not in the edit'
    )

    t.deepEqual(
      reducerResult.list[1],
      {
        _id: localAction.value._id,
        name: localAction.value.name,
        author: localAction.value.author,
        ingredients: undefined,
        instructions: undefined,
      },
      'sets editted recipe to new data, setting fields not in new response to undefined'
    )

    t.equal(
      reducerResult.errorEdit,
      null,
      'sets error edit to null'
    )
  })

  t.test('RECIPES_EDIT_FAILURE case', t => {

    const initialStateSetup = {
      list: preserved,
      recipeEdit: preserved,
      errorGet: preserved,
      errorCreate: preserved,
      errorDelete: preserved,
      errorEdit: notPreserved,
    }

    const localAction = {type: RECIPES_EDIT_FAILURE, value: 'new value'}
    const reducerResult = recipesReducer(initialStateSetup, localAction)
    const stateKeys = Object.keys(initialStateSetup)
    t.plan(stateKeys.length)

    stateKeys.forEach(key => {
      if (initialStateSetup[key] === preserved) {
        t.equal(
          reducerResult[key],
          preserved,
          `preserves ${key} reducer key`
        )
      }
      else {
        t.equal(
          reducerResult[key],
          localAction.value,
          `sets ${key} reducer key to action.value`
        )
      }
    })
  })

  t.test('RECIPES_DELETE_SUCCESS case', t => {
    const localState = {
      list: [
        { _id: '0', name: '0', },
        { _id: '1', name: '1', },
        { _id: '2', name: '2', },
      ],
      errorDelete: true
    }

    const localAction = {type: RECIPES_DELETE_SUCCESS, value: '1'}
    const reducerResult = recipesReducer(JSON.parse(JSON.stringify(localState)), localAction)
    t.plan(2)
    t.equal(
      reducerResult.errorDelete,
      null,
      'sets errorDelete to null'
    )

    t.deepEqual(
      reducerResult.list,
      [localState.list[0], localState.list[2]],
      'deletes item and returns the rest of the recipe list unmodified'
    )
  })

  t.test('RECIPES_DELETE_FAILURE case', t => {

    const initialStateSetup = {
      list: preserved,
      recipeEdit: preserved,
      errorGet: preserved,
      errorCreate: preserved,
      errorDelete: notPreserved,
      errorEdit: preserved,
    }

    const localAction = {type: RECIPES_DELETE_FAILURE, value: 'new value'}
    const reducerResult = recipesReducer(initialStateSetup, localAction)
    const stateKeys = Object.keys(initialStateSetup)
    t.plan(stateKeys.length)

    stateKeys.forEach(key => {
      if (initialStateSetup[key] === preserved) {
        t.equal(
          reducerResult[key],
          preserved,
          `preserves ${key} reducer key`
        )
      }
      else {
        t.equal(
          reducerResult[key],
          localAction.value,
          `sets ${key} reducer key to action.value`
        )
      }
    })
  })

  t.test('RECIPES_TOGGLE_VIEW case', t => {
    const localState={
      list: [
        {_id: '0', name: '0'},
        {_id: '1', name: '1', showIngredients: true},
        {_id: '2', name: '2', showIngredients: false},
      ]
    }
    const localAction = {type: RECIPES_TOGGLE_VIEW, value: '2'}
    const reducerResult = recipesReducer(localState, localAction)

    t.plan(1)
    t.deepEqual(
      reducerResult.list,
      [
        localState.list[0],
        localState.list[1],
        {...localState.list[2], showIngredients: true}
      ],
      'touches only the matched id, updating only its showIngredients flag (to its inverse)'
    )
  })

  t.test('RECIPES_TOGGLE_EDIT case', t => {
    t.plan(2)
    const localStateNotEditing = {
      recipeEdit: initialEditState,
      list: [
        {_id: '123', name: 'tasty'}
      ]
    }
    const editingActionStart = { type: RECIPES_TOGGLE_EDIT, value: '123' }

    const startedEditing = recipesReducer(localStateNotEditing, editingActionStart)
    t.deepEqual(
      startedEditing.recipeEdit,
      localStateNotEditing.list[0],
      'loads matched recipe id into recipeToEdit'
    )

    const localStateEditing = {
      recipeEdit: {
        author: '0',
        instructions: '0',
        ingredients: '0',
        name: '0',
        _id: '0',
      }
    }

    const editingActionStop = {type: RECIPES_TOGGLE_EDIT, value: undefined}

    const stoppedEditing = recipesReducer(localStateEditing, editingActionStop)
    t.deepEqual(
      stoppedEditing.recipeEdit,
      initialEditState,
      'blanks edit state when already editing'
    )
  })
})

test('mergeRecipesBy', (t) => {
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
    {actionCreator: recipesEdit, type: RECIPES_EDIT},
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



