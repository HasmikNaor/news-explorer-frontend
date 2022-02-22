import { Link } from 'react-router-dom';
import { useEffect, useContext } from 'react';
import './Navigation.css';
import logoutDark from '../../images/logout_dark.svg';
import logoutBright from '../../images/logout_white.svg';
import Mobilenavigation from '../MobileNavigation/MobileNavigation';
import currentUser from '../../contexts/CurrentUserContext';

function Navigation(props) {
  const loggedIn = props.loggedIn;
  const currentPage = props.currentPage;
  const linkColorClass = props.linkColorClass;
  const navBackgroundTypeClass = props.navBackgroundTypeClass;
  const currentTypeClass = props.currentTypeClass;
  const user = useContext(currentUser);

  const logoutImg = props.currentPage === 'home' ? logoutBright : logoutDark;

  // mobile navigation 
  const mobNavBtnhandler = () => {
    props.setIsMobileNavOpen((prevState) => !prevState);
  };

  useEffect(() => {
    props.styleNavbar();
  }, []);

  const currentPageHandler = (e) => {
    props.setCurrentPage(e.target.name);
    props.styleNavbar();
  };

  const handleLogoutClick = () => {
    props.handleLoggedIn();
    props.styleNavbar();
    localStorage.removeItem('token');
    props.setToken(localStorage.getItem('token'));
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
              className={`navigation__link ${linkColorClass}`} to="/" onClick={handleLogoutClick}>
              <p className='navigation__user'>{user.name}</p>
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
        onSignin={handleSigninBtnClick}
        onLogout={handleLogoutClick}
      />
    </div>
  );
}

export default Navigation;
