import Navigation from '../../components/Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

function Header(props) {
  const user = props.currentUser;

  return (
    <header className={`header ${props.headerDarkBackgroundClass}`}>
      <Navigation
        loggedIn={props.loggedIn}
        currentUser={user}
        handleLoggedIn={props.handleLoggedIn} setIsMobileNavOpen={props.setIsMobileNavOpen} isMobileNavOpen={props.isMobileNavOpen} navMenuOpenClass={props.navMenuOpenClass} navChangeBackground={props.navChangeBackground} navMobileCloseBtnClass={props.navMobileCloseBtnClass}
        setIsSignInPopupOpen={props.setIsSignInPopupOpen}
        isSignInPopupOpen={props.isSignInPopupOpen}
        setPopupOpenClass={props.setPopupOpenClass}
        handle
      />
      <div className='header__content'>
        <div className='header__description'>
          <h1 className='header__title'>What's going on in the world?</h1>
          <p className='header__subtitle'>Find the latest news on any topic and save them in your personal account</p>
        </div>
        <SearchForm
          onSearch={props.onSearch}
        />
      </div>
    </header>
  )
}

export default Header;
