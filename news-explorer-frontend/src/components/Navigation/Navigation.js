import { Link, useNavigate } from 'react-router-dom';
import './Navigation.css';
import logout from '../../images/logout.svg';
import Mobilenavigation from '../MobileNavigation/MobileNavigation';

function Navigation(props) {
  const loggedIn = props.loggedIn;
  const currentUser = props.currentUser;
  const loggedInStyleClass = loggedIn ? 'navigation__logedin' : '';
  const loggedInLinkClass = loggedIn ? 'navigation__logedin-link' : '';
  const loggedInCurrentClass = loggedIn ? 'navigation_current_loggedin' : '';
  const loggedOutListItemBorderClass = !loggedIn ? 'navigation__list-item_current' : '';

  const navigate = useNavigate();

  const onNavMenuClickHandler = () => {
    props.setIsMobileNavOpen((prevState) => !prevState);
  };

  const logoutClickHandler = () => {
    props.handleLoggedIn();
    navigate('/');
  };

  const handleSigninBtnClick = () => {
    props.setIsSignInPopupOpen(true);
    props.setPopupOpenClass('popup_open');
  };

  return (
    <div className='nav-container'>
      <nav className={`navigation navigation_loggedout ${loggedInStyleClass} ${props.navChangeBackground}`} >
        <div className="navigation__logo">NewsExplorer</div>
        <ul className="navigation__list">
          <li className={`navigation__list-item ${loggedOutListItemBorderClass}`}>
            <Link className={`navigation__link ${loggedInLinkClass}`} to="/">Home</Link>
          </li>
          {!loggedIn && <li className="navigation__list-item navigation__list-item_signin">
            <Link className="navigation__link navigation__link_signin-btn" to="/signin" onClick={handleSigninBtnClick}>Sign in</Link>
          </li>}
          {loggedIn && <li className={`navigation__list-item ${loggedInCurrentClass}`}>
            <Link className={`navigation__link navigation__link_current ${loggedInLinkClass} `} to="/saved-news">Saved articles</Link>
          </li>}
          {loggedIn && <li className="navigation__list-item navigation__list-item_logout-btn">
            <Link className={`navigation__link navigation__link_logout ${loggedInLinkClass}`} to="/" onClick={logoutClickHandler}>
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
