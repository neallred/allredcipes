import 'babel-polyfill'

import { watchCreateRecipe } from './create-recipe/sagas'
import { watchFetchRecipes } from './recipe-list/sagas'
import { watchDeleteRecipe } from './recipe-card/sagas'
import { watchUpdateRecipe } from './update-recipe/sagas'
import { watchSessionLoginRequest, watchSessionLogoutRequest, watchSessionCheckStatusRequest } from './session/sagas'

export function *rootSaga() {
	yield [
		watchFetchRecipes(),
		watchCreateRecipe(),
		watchDeleteRecipe(),
		watchUpdateRecipe(),
		watchSessionLoginRequest(),
		watchSessionLogoutRequest(),
		watchSessionCheckStatusRequest()
	]
}
