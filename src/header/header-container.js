import { connect } from 'react-redux'
import { Header } from './header'
import { deleteSession, createSession } from './ducks'

const mapStateToProps = (state, ownProps) => {
	return {
		session: state.session,
		deleteSession,
		createSession
	}
}

export const HeaderContainer = connect(mapStateToProps)(Header)

