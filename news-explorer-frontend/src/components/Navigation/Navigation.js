import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Navigation.css';
import logoutDark from '../../images/logout_dark.svg';
import logoutBright from '../../images/logout_white.svg';
import Mobilenavigation from '../MobileNavigation/MobileNavigation';

function Navigation(props) {
  const loggedIn = props.loggedIn;
  const currentUser = props.currentUser;
  const currentPage = props.currentPage;
  const linkColorClass = props.linkColorClass;
  const navBackgroundTypeClass = props.navBackgroundTypeClass;
  const currentTypeClass = props.currentTypeClass;

  const logoutImg = props.currentPage === 'home' ? logoutBright : logoutDark;

  // mobile navigation 
  const mobNavBtnhandler = () => {
    props.setIsMobileNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    props.navStyleHandler();
  }, []);

  const currentPageHandler = (e) => {
    props.setCurrentPage(e.target.name);
    props.navStyleHandler();
  };

  const logoutClickHandler = () => {
    props.handleLoggedIn();
    props.navStyleHandler();
  };

  const handleSigninBtnClick = () => {
    props.setIsSignInPopupOpen(true);
  };

  return (
    <div className={`nav-container ${navBackgroundTypeClass}`}>
      <nav className='navigation'>
        <div className="navigation__logo">NewsExplorer</div>
        <ul className="navigation__list">
          <li
            className={`navigation__list-item 
          ${currentPage === 'home' && currentTypeClass}`
            }>
            <Link
              className={`navigation__link 
            ${linkColorClass}`}
              to="/"
              onClick={currentPageHandler}
              name='home'>
              Home
            </Link>
          </li>
          {!loggedIn && <li className="navigation__list-item navigation__list-item_signin">
            <Link
              className={`navigation__link navigation__link_signin-btn ${linkColorClass}`}
              to="/signin"
              onClick={handleSigninBtnClick}>
              Sign in
            </Link>
          </li>}
          {loggedIn && <li
            className={`navigation__list-item 
          ${currentPage === 'saved articles' && currentTypeClass}`
            }>
            <Link
              className={`navigation__link 
            ${linkColorClass}`}
              to="/saved-news"
              name='saved articles'
              onClick={currentPageHandler}>
              Saved articles
            </Link>
          </li>}
          {loggedIn && <li
            className="navigation__list-item navigation__list-item_logout-btn">
            <Link
              className={`navigation__link ${linkColorClass}`} to="/" onClick={logoutClickHandler}>
              <p className='navigation__user'>{currentUser.name}</p>
              <img src={logoutImg} alt='logout' />
            </Link>
          </li>}
        </ul>

        <button type='button'
          className={`navigation__mobile-btn ${props.navMobileBtnClass}`}
          onClick={mobNavBtnhandler} >
        </button>

      </nav>
      <Mobilenavigation
        {...props}
        handleSignin={handleSigninBtnClick}
        logoutClickHandler={logoutClickHandler}
      />
    </div>
  );
}

export default Navigation;
