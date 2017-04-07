import React from 'react'
import './header.scss'

export class Header extends React.Component {
	componentWillMount() {
		window.addEventListener('resize', this.measureHeight.bind(this))
	}

	componentDidMount() {
		this.measureHeight();
	}

	render() {
		const {
			//actions
			sessionLogin,
			sessionLogout,
			headerButtonSelect,
			headerHandleInput,
			headerMeasureHeight,

			//store
			dispatch,
			session,
			buttonSelected,
			username,
			password,
			email,
			passwordConfirm
		} = this.props;
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

		const loggedOutHeader = <header className='header__wrapper' ref='header'>
			<div className="header__button-group">
				<button className={`header__item header__button header__button__login header__button__login${buttonSelected === 'login' ? '--selected' : ''}` }
					onClick={() => {dispatch(headerButtonSelect('login'))}}>Login</button>
				<button className={`header__item header__button header__button__forgot header__button__forgot${buttonSelected === 'forgot' ? '--selected' : ''}`}
					onClick={() => {dispatch(headerButtonSelect('forgot'))}}>Lost User/Pass?</button>
				<button className={`header__item header__button header__button__signup header__button__signup${buttonSelected === 'signup' ? '--selected' : ''}`}
					onClick={() => {dispatch(headerButtonSelect('signup'))}}>Sign up</button>
			</div><span></span>
			<form className="header__form">
				{buttonSelected !== 'login' && <input className="header__item header__input header__input__email"
					placeholder={buttonSelected === 'forgot' ? 'email' : 'email (optional)'}
					type="email"
					value={email}
					onChange={(e) => {dispatch(headerHandleInput({input: e.target.value, inputField: 'email'}))}} />}
				{buttonSelected !== 'forgot' && <input className="header__item header__input header__input__username"
					placeholder="username"
					onChange={(e) => {dispatch(headerHandleInput({input: e.target.value, inputField: 'username'}))}}
					value={username} />}
				{buttonSelected !== 'forgot' && <input className="header__item header__input header__input__password"
					placeholder="password"
					type="password"
					value={password}
					onChange={(e) => {dispatch(headerHandleInput({input: e.target.value, inputField: 'password'}))}} />}
				{buttonSelected === 'signup' && <input className="header__item header__input header__input__password-confirm"
					placeholder="confirm password"
					type="password"
					value={passwordConfirm}
					onChange={(e) => {dispatch(headerHandleInput({input: e.target.value, inputField: 'passwordConfirm'}))}} />}
				<input className={`header__item header__input header__input__do header__input__do${enableSubmit() ? '' : '--disabled'}`}
					disabled={!enableSubmit()}
					type="submit"
					value="Enter"
					onClick={(e) => {e.preventDefault(); dispatch(sessionLogin({username, email, password, requestType: buttonSelected}))}}/>
			</form>
		</header>

			const loggedInHeader =  <header className='header__wrapper' ref='header'>
				<button className="header__item header__button" onClick={() => {dispatch(sessionLogout())}}>Logout</button>
				<button className="header__item header__button header__button__new-recipe">New Recipe</button>
			</header>

			return session.isLoggedIn ? loggedInHeader : loggedOutHeader
	}

	componentDidUpdate() {
		this.measureHeight();
	}

	measureHeight() {
		const { dispatch, headerMeasureHeight } = this.props;
		const height = this.refs.header.offsetHeight;
		dispatch(headerMeasureHeight(height));
	}

	componentWillUnmount() {
		window.removeEventListener('resize', this.measureHeight.bind(this))
	}
}
