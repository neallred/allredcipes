import React from 'react'
export const Header = ({
	dispatch,
	session,
	createSession,
	deleteSession

}) => (
	<div className='header'>
		<ul>
			<li onClick={() => {
				if (session.isLoggedIn) {
					dispatch(deleteSession())
				}
				else {
					dispatch(createSession())
				}
			}}>
				{session.isLoggedIn ? 'Logout' : 'Login'}
			</li>
			<li>New Recipe</li>
		</ul>
	</div>
)
