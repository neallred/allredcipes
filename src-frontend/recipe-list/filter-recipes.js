export function filterRecipes(recipes, search) {
  const enabledSearches = getEnabledSearches(search)
  if (!(Object.keys(enabledSearches).length)) {
    return recipes
  }
  return recipes.filter(recipe => checkRecipeForMatch(recipe, enabledSearches))
}

export function checkRecipeForMatch(recipe, search) {
  const searchKeys = Object.keys(search)
  return searchKeys.every(searchKey => {
    if (searchKey === 'author' || searchKey === 'name') {
      return fuzzyMatch(recipe[searchKey], search[searchKey].terms)
    }
    else {
      return wordMatch(recipe[searchKey], search[searchKey].terms)
    }
  })
}

export function getEnabledSearches(searches) {
  const enabledSearches = {}
  Object.keys(searches).forEach(key => {
    if (searches[key].enabled && searches[key].terms.trim()) {
      enabledSearches[key] = searches[key]
    }
  })

  return enabledSearches
}

export function fuzzyMatch(text, search) {
  if (text === undefined || search === undefined) {
    return false
  }

  const searchCharacters = search.replace(/\s/g, '').toLowerCase().split('')
  let textLower = text.toLowerCase()

  return searchCharacters.every(char => {
    const charFound = textLower.indexOf(char)
    if (charFound === -1) {
      return false
    }
    else {
      textLower = textLower.slice(textLower.indexOf(char))
      return true
    }
  })
}

export function wordMatch(text, search) {
  if (text === undefined || search === undefined) {
    return false
  }

  const splitBy = ' '
  const wordsToMatch = search
    .replace(/,/g, '')
    .toLowerCase()
    .trim()
    .split(splitBy)
  const textLower = text.toLowerCase();

  return wordsToMatch.every(searchWord => {
    const wordFound = textLower.indexOf(searchWord)
    if (wordFound === -1) {
      return false
    }
    else {
      return true
    }
  })
}
