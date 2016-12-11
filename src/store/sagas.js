import 'babel-polyfill'

import { watchFetchRecipes } from '../recipe-list/sagas'
import { watchDeleteRecipe } from '../recipe-card/sagas'
import { watchUpdateRecipe, watchCreateRecipe } from '../recipe-form/sagas'
import { watchSessionLoginRequest, watchSessionLogoutRequest, watchSessionCheckStatusRequest } from '../session/sagas'

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
