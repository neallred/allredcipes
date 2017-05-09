import {badWords} from '../constants/badwords'

const filterInput = function(recipePiece, filterObject, replacementPattern){
	let newString = recipePiece
	if(Array.isArray(filterObject)){
		for(let i=0;i<filterObject.length;i++){
			newString = newString ? newString.replace(regexer(filterObject[i]),replacementPattern): ''
		}
	} else if (typeof filterObject === 'object'){
		const hashKeys = Object.keys(filterObject)
		for(let i=0;i<hashKeys.length;i++){
			newString = newString ? newString.replace(regexer(hashKeys[i]), filterObject[hashKeys[i]]): ''
		}
	}
	return newString
}

export const recipesScrubbing = (recipeId, hideIngredients, name, ingredients, instructions, author) => {
	var nameFiltered = filterInput(name, badWords, '***')
	var ingredientsFiltered = filterInput(filterInput(ingredients, abbreviations), badWords, '***')
	var instructionsFiltered = filterInput(instructions, badWords, '***')
	var authorFiltered = filterInput(author, badWords, '***')
	return {
		type: RECIPES_UPDATE,
    value: {
      recipeId,
      name: nameFiltered,
      ingredients: ingredientsFiltered,
      instructions: instructionsFiltered,
      author: authorFiltered
    }
	}
}


