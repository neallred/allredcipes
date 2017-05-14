import 'babel-polyfill'

import {
  watchRecipesGet,
  watchRecipesEdit,
  /*, watchDeleteRecipe*/
} from '../recipe-list/sagas'
import {
  watchUpdateRecipe,
  watchCreateRecipe,
} from '../recipe-form/sagas'
import {
  watchSessionLoginRequest,
  watchSessionLogoutRequest,
  watchSessionCheckStatusRequest
} from '../session/sagas'

export function *rootSaga() {
	yield [
		watchRecipesGet(),
		watchRecipesEdit(),
    //		watchCreateRecipe(),
    //		watchDeleteRecipe(),
		watchSessionLoginRequest(),
		watchSessionLogoutRequest(),
		watchSessionCheckStatusRequest()
	]
}
