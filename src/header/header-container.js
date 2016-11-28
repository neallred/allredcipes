import { connect } from 'react-redux'
import { Header } from './header'
import { headerButtonSelect, headerHandleInput } from './ducks'
import { sessionLogin, sessionLogout } from '../session/ducks'

const mapStateToProps = (state, ownProps) => {
	const {session, header} = state
	const { buttonSelected, email, username, password, passwordConfirm } = header

	return {
		//actions
		sessionLogin,
		sessionLogout,
		headerButtonSelect,
		headerHandleInput,

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

export const HeaderContainer = connect(mapStateToProps)(Header)

