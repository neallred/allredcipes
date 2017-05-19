import React from 'react'
import './header.scss'

const baseClass = 'header';
export class Header extends React.Component {
  constructor(props) {
    super(props);

    const methods = [
      'measureHeight',
      'getButtonClass',
    ];
    methods.map(method => this[method] = this[method].bind(this))
  }

	componentWillMount() {
    let window = window || {addEventListener: ()=>{}} //overcome limitations of non browser environments (i.e. Node and Tape)
    window.addEventListener('resize', this.measureHeight)
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
      recipesToggleCreate,

			//store
			dispatch,
			session={},
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
				<button className={this.getButtonClass('login')}
					onClick={() => {headerButtonSelect('login')}}>Login</button>
				<button className={this.getButtonClass('forgot')}
					onClick={() => {headerButtonSelect('forgot')}}>Lost User/Pass?</button>
				<button className={this.getButtonClass('signup')}
					onClick={() => {headerButtonSelect('signup')}}>Sign up</button>
			</div><span></span>
			<form className="header__form">
				{buttonSelected !== 'login' && <input className="header__input"
					placeholder={buttonSelected === 'forgot' ? 'email' : 'email (optional)'}
					type="email"
					value={email}
					onChange={e => headerHandleInput('email', e.target.value)} />}
				{buttonSelected !== 'forgot' && <input className="header__input"
					placeholder="username"
					onChange={e => headerHandleInput('username', e.target.value)}
					value={username} />}
				{buttonSelected !== 'forgot' && <input className="header__input"
					placeholder="password"
					type="password"
					value={password}
					onChange={e => headerHandleInput('password', e.target.value)} />}
				{buttonSelected === 'signup' && <input className="header__input"
					placeholder="confirm password"
					type="password"
					value={passwordConfirm}
					onChange={e => headerHandleInput('passwordConfirm', e.target.value)} />}
				<input className={`header__input header__input__do header__input__do${enableSubmit() ? '' : '--disabled'}`}
					disabled={!enableSubmit()}
					type="submit"
					value="Enter"
					onClick={(e) => {e.preventDefault(); sessionLogin({username, email, password, requestType: buttonSelected})}}/>
			</form>
		</header>

			const loggedInHeader =  <header className='header__wrapper' ref='header'>
				<button className="header__button" onClick={() => {sessionLogout()}}>Logout</button>
        <button className="header__button" onClick={() => {recipesToggleCreate()}} >New Recipe</button>
			</header>

			return session.isLoggedIn ? loggedInHeader : loggedOutHeader
	}

	componentDidUpdate() {
		this.measureHeight();
	}

	measureHeight() {
		const height = this.refs.header.offsetHeight;
		this.props.headerMeasureHeight(height);
	}

	componentWillUnmount() {
      let window = window || {removeEventListener: ()=>{}} //overcome limitations of non browser environments (i.e. Node and Tape)
      window.removeEventListener('resize', this.measureHeight)
	}

  getButtonClass(buttonName) {
    let buttonClass = `${baseClass}__button ${baseClass}__button--${buttonName}`
    if (this.props.buttonSelected === buttonName) {
      buttonClass = buttonClass + ' ' + `${baseClass}__button--selected`
    }
    return buttonClass
  }
}
