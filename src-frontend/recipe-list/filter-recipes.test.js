import tape from 'tape'
const test = tape

import {
  filterRecipes,
  checkAllEnabledEmpty,
  getEnabledSearches,
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
  author: {
    enabled: false,
    terms: '',
  },
  ingredients: {
    enabled: false,
    terms: '',
  },
  instructions: {
    enabled: false,
    terms: '',
  },
  name: {
    enabled: false,
    terms: '',
  },
}

const searchEnabledEmpty = {
  author: {
    enabled: true,
    terms: '',
  },
  ingredients: {
    enabled: true,
    terms: '',
  },
  instructions: {
    enabled: false,
    terms: '12asdf3',
  },
  name: {
    enabled: true,
    terms: '',
  },
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

  //  t.test('does appropriate thing in following circumstances', t => {
  //    const setup = [
  //      'a'
  //    ]
  //
  //    t.plan(setup.length)
  //    setup.map(testData => {
  //
  //      t.equal(
  //        'expected',
  //        'actual',
  //        `test of ${testData} condition` 
  //      )
  //    })
  //  })
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
