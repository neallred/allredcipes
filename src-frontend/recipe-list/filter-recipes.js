export function filterRecipes(recipes, search) {
  const enabledSearches = getEnabledSearches(search)
  if (!(Object.keys(enabledSearches).length)) {
    return recipes
  }
}

export function getEnabledSearches(searches) {
  const enabledSearches = {}
  Object.keys(searches).forEach(key => {
    if (searches[key].enabled && searches[key].terms) {
      enabledSearches[key] = searches[key]
    }
  });

  return enabledSearches
}



