import React from 'react'

import './header.scss'

export const Header = ({
	dispatch,
	session,
	createSession,
	deleteSession,
	headerButtonSelect,
	buttonSelected
}) => (
	<header className='header__header'>
		{!session.isLoggedIn && <div className='header__wrapper'>
			<button className={`header__button header__button__login header__button__login${buttonSelected === 'login' ? '--selected' : ''}`} onClick={() => {dispatch(headerButtonSelect('login'))}}>Login</button>
			<button className={`header__button header__button__signup header__button__signup${buttonSelected === 'signup' ? '--selected' : ''}`} onClick={() => {dispatch(headerButtonSelect('signup'))}}>Sign up</button>
			<input className="header__input" placeholder="username" type="password"></input>
			<input className="header__input" placeholder="password" type="password"></input>
			<input className="header__input" placeholder="confirm password" type="password"></input>
			<button className="header__button header__button__do" onClick={() => {dispatch(createSession())}}>Enter</button>
		</div>}
		{session.isLoggedIn && <button className="header__button" onClick={() => {dispatch(deleteSession())}}>Logout</button>}
		<button className="header__button header__button__new-recipe">New Recipe</button>
	</header>
)
