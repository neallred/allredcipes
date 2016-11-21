import { connect } from 'react-redux'
import { Header } from './header'
import { headerButtonSelect } from './ducks'
import { deleteSession, createSession } from '../session/ducks'

const mapStateToProps = (state, ownProps) => {
	const {session, header} = state

	return {
		//actions
		deleteSession,
		createSession,
		headerButtonSelect,

		//state
		session,
		buttonSelected: header.buttonSelected
	}
}

export const HeaderContainer = connect(mapStateToProps)(Header)

