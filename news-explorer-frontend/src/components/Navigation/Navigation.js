import { Link } from 'react-router-dom';
import { useEffect } from 'react';
import './Navigation.css';
import logout from '../../images/logout.svg';
import Mobilenavigation from '../MobileNavigation/MobileNavigation';

function Navigation(props) {
  const loggedIn = props.loggedIn;
  const currentUser = props.currentUser;
  const currentPage = props.currentPage;
  const linkColorClass = props.linkColorClass;
  const navBackgroundTypeClass = props.navBackgroundTypeClass;
  const currentTypeClass = props.currentTypeClass;

  // mobile navigation 
  const onNavMenuClickHandler = () => {
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
    <div className='nav-container'>
      <nav className={`navigation ${navBackgroundTypeClass}`}>
        <div className="navigation__logo">NewsExplorer</div>
        <ul className="navigation__list">
          <li className={`navigation__list-item ${currentPage === 'home' && currentTypeClass}`}>
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
          {loggedIn && <li className={`navigation__list-item ${currentPage === 'saved articles' && currentTypeClass}`}>
            <Link
              className={`navigation__link 
            ${linkColorClass}`}
              to="/saved-news"
              name='saved articles'
              onClick={currentPageHandler}>
              Saved articles
            </Link>
          </li>}
          {loggedIn && <li className="navigation__list-item navigation__list-item_logout-btn">
            <Link className={`navigation__link ${linkColorClass}`} to="/" onClick={logoutClickHandler}>
              <p className='navigation__user'>{currentUser.name}</p>
              <img src={logout} />
            </Link>
          </li>}
        </ul>
        {!loggedIn && <button type='button' className={`navigation__menu-btn ${props.navMobileCloseBtnClass}`} onClick={onNavMenuClickHandler} ></button>}
        {loggedIn && <button type='button' className={`navigation__menu-btn navigation__menu-btn_loggedin ${props.navMobileCloseBtnClass}`} onClick={onNavMenuClickHandler}></button>}
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
