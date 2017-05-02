import tape from 'tape'
const test = tape

import {
  checkAllEnabledEmpty,
  checkRecipeForMatch,
  filterRecipes,
  fuzzyMatch,
  getEnabledSearches,
  wordMatch,
} from './filter-recipes'

const recipesOne = [
  {
		_id: '_id',
		name: 'name',
		ingredients: 'ingredients',
		instructions: 'instructions',
		author: 'author',
  },
]

const recipesFive = [
  {
		_id: '_id1',
		name: 'Buttermilk Pancakes',
		ingredients: '1. Flour. 2. milk. 3. Eggs. 4. Sugar 5. baking powder 6. salt',
		instructions: '1. Mix wet ingredients. 2. Pour in dry ingredients. Mix all together. Bake on griddle at 350 F. Flip when edges start to brown.',
		author: 'Flap Jack',
  },
  {
		_id: '_id2',
		name: 'Allredcipes',
		ingredients: 'Git, React, Redux, Webpack, Babel, Node, Testdouble, Tape, enzyme, MongoDB',
    instructions: '1. Clone https://github.com/neallred/allredcipes.git. 2. Run `npm install` (assumes npm and node). 3. run `npm run start-watch`.',
		author: 'neallred',
  },
  {
		_id: '_id3',
		name: 'biscuits',
		ingredients: 'milk flour water eggs sugar, lard',
		instructions: 'mix it all. cut it in circles. bake at 350 for 10-12 min.',
		author: 'bisquick',
  },
  {
		_id: '_id4',
		name: 'lasagna',
		ingredients: 'pasta sauce, lots of it. cheese, lots of it. 12 half-baked lasagna noodle. sum meats',
		instructions: 'mix it in a blender',
		author: 'Joe Talian',
  },
  {
		_id: '_id5',
		name: 'name',
		ingredients: 'ingredients',
		instructions: 'instructions',
		author: 'Miss Quiggle',
  },
]


const searchDisabled = {
  author: {enabled: false, terms: ''},
  ingredients: {enabled: false, terms: ''},
  instructions: {enabled: false, terms: ''},
  name: {enabled: false, terms: ''}
}

const searchEnabledEmpty = {
  author: {enabled: true, terms: ''},
  ingredients: {enabled: true, terms: ''},
  instructions: {enabled: false, terms: '12asdf3'},
  name: {enabled: true, terms: ''},
}

const searchEnabledAuthor = {
  author: {enabled: true, terms: 'red'},
  ingredients: {enabled: true, terms: ''},
  instructions: {enabled: true, terms: ''},
  name: {enabled: true, terms: ''},
}

const searchEnabledAuthorIngredients = {
  author: {enabled: true, terms: 'red'},
  ingredients: {enabled: true, terms: 'milk'},
  instructions: {enabled: true, terms: ''},
  name: {enabled: true, terms: ''},
}

const searchEnabledAuthorIngredientsInstructions = {
  author: {enabled: true, terms: 'red'},
  ingredients: {enabled: true, terms: 'milk'},
  instructions: {enabled: true, terms: 'mix'},
  name: {enabled: true, terms: ''},
}

const searchEnabledAll = {
  author: {enabled: true, terms: 'red'},
  ingredients: {enabled: true, terms: 'milk'},
  instructions: {enabled: true, terms: 'mix'},
  name: {enabled: true, terms: 'isc'},
}

test('filterRecipes', (t) => {

  t.test('returns all recipes when no filters are enabled', t => {
    t.plan(1)
    const filteredRecipes = filterRecipes(recipesFive, searchDisabled)
    t.equal(
      filteredRecipes.length,
      5
    )
  })

  t.test('returns all recipes when all enabled filters are empty', t => {
    t.plan(1)
    const filteredRecipes = filterRecipes(recipesFive, searchEnabledEmpty)
    t.equal(
      filteredRecipes.length,
      5
    )
  })

  t.test('finds correctNumber', t => {
    const searches = [
      {
        author: {enabled: false, terms: ''},
        ingredients: {enabled: true, terms: ''},
        instructions: {enabled: true, terms: ''},
        name: {enabled: true, terms: 'cs'}
      },
      {
        author: {enabled: false, terms: ''},
        ingredients: {enabled: true, terms: 'react'},
        instructions: {enabled: false, terms: ''},
        name: {enabled: false, terms: 'cs'}
      },
      {
        author: {enabled: true, terms: 'i'},
        ingredients: {enabled: true, terms: ''},
        instructions: {enabled: true, terms: 'mix'},
        name: {enabled: false, terms: ''}
      },
      {
        author: {enabled: true, terms: 'asdf'},
        ingredients: {enabled: true, terms: 'lkjasddf}kljio2j34'},
        instructions: {enabled: true, terms: '!@#$AFDKLJLASJFLK'},
        name: {enabled: true, terms: 'cs'}
      },
      {
        author: {enabled: false, terms: 'asdf'},
        ingredients: {enabled: true, terms: 'milk    flour   eggs'},
        instructions: {enabled: true, terms: 'mix'},
        name: {enabled: false, terms: 'cs'}
      },
    ]

    const numberFound = [
      3,
      1,
      2,
      0,
      2
    ]

    t.plan(searches.length)
    searches.map((search, i) => {
      const results = filterRecipes(recipesFive, search)
      t.equal(
        results.length,
        numberFound[i]
      )
    })

  })




})

test('getEnabledSearches', (t) => {
  t.test('returns all recipes when all enabled filters are empty', t => {
    const setup = [
      [
        searchEnabledEmpty,
        []
      ],
      [
        searchEnabledAuthor,
        ['author']
      ],
      [
        searchEnabledAuthorIngredients,
        ['author', 'ingredients']
      ],
      [
        searchEnabledAuthorIngredientsInstructions,
        ['author', 'ingredients', 'instructions']
      ],
      [
        searchEnabledAll,
        ['author', 'ingredients', 'instructions', 'name']
      ],
    ]
    const numberOfTests = setup.reduce((acc, curr) => {
      return acc + 1 + curr[1].length
    },0)
    t.plan(numberOfTests)

    setup.map(testData => {
      const enabledSearches = getEnabledSearches(testData[0])
      const searchKeys = Object.keys(enabledSearches)
      t.equal(
        searchKeys.length,
        testData[1].length
      )
      searchKeys.forEach(key => {
        t.equal(
          !!(enabledSearches[key].enabled && enabledSearches[key].terms),
          true,
          `search key ${key} is enabled and has terms`
        )
      })
    })
  })
})

test('fuzzyMatch', (t) => {

  const setup = [
    ['Can!You!Do!20!Tricks!?', 'canyou', true],
    ['Can!You!Do!20!Tricks!?', 'c!t', true],
    ['Can!You!Do!20!Tricks!?', '!!!?', true],
    ['Can!You!Do!20!Tricks!?', '   y ti  ', true],
    ['Can!You!Do!20!Tricks!?', '   !CAN!YOU', false],
    ['The quick brown fox jumped over the lazy dogs.', 'Q B F J O ', true],
    ['The quick brown fox jumped over the lazy dogs.', 'xbrown', false],
    ['The quick brown fox jumped over the lazy dogs.', 'jzyq', false],
  ]

  t.plan(setup.length)

  setup.forEach(testData => {

    const matched = fuzzyMatch(testData[0], testData[1])
    t.equal(
      matched,
      testData[2]
    )
  })
})

test('wordMatch', (t) => {
  const setup = [
    ['Molten chocolate lava cake', 'ten cola', true],
    ['Molten chocolate lava cake', 'chocolatey', false],
    ['ice cream sandwiches are really tasty', 'cream sand real really', true],
    ['ice cream sandwiches are really tasty', 'real really tasty nasty', false],
    ['asparagus chicken potatoes brussel sprouts more healthy vegetables', 'heal table ore SpRouTs', true],
    ['asparagus chicken potatoes brussel sprouts more healthy vegetables', 'aparag', false],
    ['Can You Do 20 Tricks?', '   y tri  ', true],
    ['Can You Do 20 Tricks?', '   y tix  ', false],
    ['The quick brown fox jumped over the lazy dogs.', 'lazy ', true],
    ['The quick brown fox jumped over the lazy dogs.', 'quick quickly', false],
  ]

  t.plan(setup.length)

  setup.forEach(testData => {

    const matched = wordMatch(testData[0], testData[1])
    t.equal(
      matched,
      testData[2]
    )
  })
})


test('checkRecipeForMatch', (t) => {

  const searches = [
    {
      author: {enabled: true, terms: 'a'},
      ingredients: {enabled: true, terms: 'i'},
      instructions: {enabled: true, terms: 'i'},
      name: {enabled: true, terms: 'z'}
    },
    {
      author: {enabled: true, terms: 'a'},
      ingredients: {enabled: true, terms: 'i'},
      instructions: {enabled: true, terms: 'i'},
      name: {enabled: false, terms: 'z'}
    },
    {
      author: {enabled: true, terms: 'a'},
      ingredients: {enabled: true, terms: 'i'},
      instructions: {enabled: true, terms: 'i'},
      name: {enabled: true, terms: 'a E'}
    },
  ]

  const testSetup = [
    [false, 'returns false when not all search terms match'],
    [true, 'returns true when all enabled search terms match'],
    [true, 'returns true when all enabled search terms match'],
  ]

  //_id: '_id',
  //name: 'name',
  //ingredients: 'ingredients',
  //instructions: 'instructions',
  //author: 'author',

  const recipeToMatch = recipesOne[0]

  t.plan(testSetup.length)

  searches.forEach((search, i) => {
    const matched = checkRecipeForMatch(recipeToMatch, getEnabledSearches(search))
    t.equal(
      matched,
      testSetup[i][0],
      testSetup[i][1],
    )
  })
})
