import 'babel-polyfill';

import { watchCreateRecipe } from './create-recipe/sagas';
import { watchFetchRecipes } from './recipe-list/sagas';
import { watchDeleteRecipe } from './recipe-card/sagas';
import { watchUpdateRecipe } from './update-recipe/sagas';

export function *rootSaga() {
	yield [
		watchFetchRecipes(),
		watchCreateRecipe(),
		watchDeleteRecipe(),
		watchUpdateRecipe()
	]
}
