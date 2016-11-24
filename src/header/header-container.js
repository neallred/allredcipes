import { connect } from 'react-redux'
import { Header } from './header'
import { headerButtonSelect, headerHandleInput } from './ducks'
import { sessionLogin, sessionLogout } from '../session/ducks'

const mapStateToProps = (state, ownProps) => {
	const {session, header} = state

	return {
		//actions
		sessionLogin,
		sessionLogout,
		headerButtonSelect,
		headerHandleInput,

		//state
		session,
		buttonSelected: header.buttonSelected,
		username: header.username,
		password: header.password,
		passwordConfirm: header.passwordConfirm
	}
}

export const HeaderContainer = connect(mapStateToProps)(Header)

