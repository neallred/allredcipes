import 'babel-polyfill'

import { watchRecipesGet/*, watchDeleteRecipe*/ } from '../recipe-list/sagas'
import { watchUpdateRecipe, watchCreateRecipe } from '../recipe-form/sagas'
import {
  watchSessionLoginRequest,
  watchSessionLogoutRequest,
  watchSessionCheckStatusRequest
} from '../session/sagas'

export function *rootSaga() {
	yield [
		watchRecipesGet(),
    //		watchCreateRecipe(),
    //		watchDeleteRecipe(),
    //		watchUpdateRecipe(),
		watchSessionLoginRequest(),
		watchSessionLogoutRequest(),
		watchSessionCheckStatusRequest()
	]
}
