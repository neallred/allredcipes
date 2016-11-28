import React from 'react'

import './header.scss'

export const Header = ({
	//actions
	sessionLogin,
	sessionLogout,
	headerButtonSelect,
	headerHandleInput,

	//store
	dispatch,
	session,
	buttonSelected,
	username,
	password,
	email,
	passwordConfirm
}) => {
	const enableSubmit = () => {
		if (
			((buttonSelected === 'login') && username && password)
			||
			((buttonSelected === 'signup') && username && password && passwordConfirm && (password === passwordConfirm))
			||
			((buttonSelected === 'forgot') && validateEmail(email))
		)
		{
			return true
		}
		return false	
	}

	const validateEmail = (emailString) => {
		const regex = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
		return regex.test(emailString)
	}

	return <header className='header__header'>
		{!session.isLoggedIn && <div className='header__wrapper'>
			<button className={`header__button header__button__login header__button__login${buttonSelected === 'login' ? '--selected' : ''}`}
				    onClick={() => {dispatch(headerButtonSelect('login'))}}>Login</button>
			<button className={`header__button header__button__forgot header__button__forgot${buttonSelected === 'forgot' ? '--selected' : ''}`}
				    onClick={() => {dispatch(headerButtonSelect('forgot'))}}>Forgot User/Pass?</button>
			<button className={`header__button header__button__signup header__button__signup${buttonSelected === 'signup' ? '--selected' : ''}`}
				    onClick={() => {dispatch(headerButtonSelect('signup'))}}>Sign up</button>
			{buttonSelected !== 'login' && <input className="header__input"
				                                  placeholder={buttonSelected === 'forgot' ? 'email' : 'email (optional)'}
				                                  type="email"
				                                  value={email}
				                                  onChange={(e) => {dispatch(headerHandleInput({input: e.target.value, inputField: 'email'}))}} />}
		    {buttonSelected !== 'forgot' && <input className="header__input"
				                                   placeholder="username"
												   onChange={(e) => {dispatch(headerHandleInput({input: e.target.value, inputField: 'username'}))}}
												   value={username} />}
		    {buttonSelected !== 'forgot' && <input className="header__input"
			                                       placeholder="password"
			                                       type="password"
			                                       value={password}
			                                       onChange={(e) => {dispatch(headerHandleInput({input: e.target.value, inputField: 'password'}))}} />}
			{buttonSelected === 'signup' && <input className="header__input"
				                                   placeholder="confirm password"
				                                   type="password"
				                                   value={passwordConfirm}
				                                   onChange={(e) => {dispatch(headerHandleInput({input: e.target.value, inputField: 'passwordConfirm'}))}} />}
			<button className={`header__button header__button__do header__button__do${enableSubmit() ? '' : '--disabled'}`}
				    disabled={!enableSubmit()}
				    onClick={() => {dispatch(sessionLogin({username, email, password, requestType: buttonSelected}))}}>Enter</button>
		</div>}
		{session.isLoggedIn && <div className='header__wrapper'>
			<button className="header__button" onClick={() => {dispatch(sessionLogout())}}>Logout</button>
			<button className="header__button header__button__new-recipe">New Recipe</button>
		</div>}
	</header>
}
