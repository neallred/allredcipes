import { connect } from 'react-redux'
import { Header } from './header'
import {
  headerButtonSelect,
  headerHandleInput,
  headerMeasureHeight
} from './ducks'
import {
  sessionLogin,
  sessionLogout
} from '../session/ducks'
import {
  recipesToggleCreate
} from '../recipe-list/ducks'

export function mapStateToProps(state, ownProps) {
	const {session, header} = state
	const { buttonSelected, email, username, password, passwordConfirm } = header

	return {
		//actions
		sessionLogin,
		sessionLogout,
		headerButtonSelect,

		//state
		session,

		//form values
		buttonSelected,
		email,
		username,
		password,
		passwordConfirm
	}
}

export function mapDispatchToProps(dispatch) {
  return {
    headerHandleInput: (field, value) => {
      dispatch(headerHandleInput({inputField: field, input: value}))
    },
    headerMeasureHeight: height => dispatch(headerMeasureHeight(height)),
    headerButtonSelect: button => dispatch(headerButtonSelect(button)),

    recipesToggleCreate: () => dispatch(recipesToggleCreate()),

    sessionLogin: loginRequest => dispatch(sessionLogin(loginRequest)),
    sessionLogout: () => dispatch(sessionLogout()),
  }
}

export const HeaderContainer = connect(mapStateToProps, mapDispatchToProps)(Header)
