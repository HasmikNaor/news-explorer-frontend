import './MobileNavigation.css';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import logoutDark from '../../images/logout_dark.svg';
import logoutBright from '../../images/logout_white.svg';
import currentUser from '../../contexts/CurrentUserContext';

function Mobilenavigation(props) {
  const loggedIn = props.loggedIn;
  const user = useContext(currentUser);
  const logoutImg = props.currentPage === 'home' ? logoutBright : logoutDark;
  const handleSigninBtnClick = () => {
    props.onSignin();
    props.setIsMobileNavOpen(false);
  };

  const handleLogoutClick = () => {
    props.onLogout();
  };
  return (
    <nav
      className={`mobile-navigation
    ${props.mobileNavTypeClass} 
    ${props.navMenuOpenClass}`} >
      <ul className="mobile-navigation__list">
        <li className='mobile-navigation__list-item'>
          <Link
            className={`mobile-navigation__link 
            ${props.mobileLinkTypeClass}`}
            to="/">Home</Link>
        </li>
        {!loggedIn && <li className="mobile-navigation__list-item mobile-navigation__list-item_signin">
          <Link className="mobile-navigation__link mobile-navigation__link_signin-btn" to="/signin" onClick={handleSigninBtnClick}>Sign in</Link>
        </li>}
        {loggedIn && <li className='mobile-navigation__list-item' >
          <Link className={`mobile-navigation__link ${props.mobileLinkTypeClass}`} to="/saved-news">Saved articles</Link>
        </li>}
        {loggedIn && <li className="mobile-navigation__list-item mobile-navigation__list-item_logout-btn">
          <Link className={`mobile-navigation__link mobile-navigation__link_logout-btn ${props.mobileLinkTypeClass}`} to="/" onClick={handleLogoutClick}>
            <p className='mobile-navigation__user'>{user.name}</p>
            <img src={logoutImg} alt='logout' />
          </Link>
        </li>}
      </ul>
    </nav >
  );
}

export default Mobilenavigation;
