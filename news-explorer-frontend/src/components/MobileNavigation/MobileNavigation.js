import './MobileNavigation.css';
import { Link } from 'react-router-dom';
import logout from '../../images/logout.svg';

function Mobilenavigation(props) {
  const loggedIn = props.loggedIn;
  const currentUser = props.currentUser;
  const loggedInStyleClass = loggedIn && 'mobile-navigation__logedin';
  const loggedInLinkClass = loggedIn && 'mobile-navigation__logedin-link';

  const handleSigninBtnClick = () => {
    props.handleSignin();
    props.setIsMobileNavOpen(false);
  };

  const logoutClickHandler = () => {
    props.logoutClickHandler();
  };

  return (
    <nav className={`mobile-navigation  ${loggedInStyleClass} ${props.navMenuOpenClass}`} >
      <ul className="mobile-navigation__list">
        <li className='mobile-navigation__list-item'>
          <Link className={`mobile-navigation__link ${loggedInLinkClass}`} to="/">Home</Link>
        </li>
        {!loggedIn && <li className="mobile-navigation__list-item mobile-navigation__list-item_signin">
          <Link className="mobile-navigation__link mobile-navigation__link_signin-btn" to="/signin" onClick={handleSigninBtnClick}>Sign in</Link>
        </li>}
        {loggedIn && <li className='mobile-navigation__list-item' >
          <Link className={`mobile-navigation__link ${loggedInLinkClass}`} to="/saved-news">Saved articles</Link>
        </li>}
        {loggedIn && <li className="mobile-navigation__list-item mobile-navigation__list-item_logout-btn">
          <Link className={`mobile-navigation__link mobile-navigation__link_logout-btn ${loggedInLinkClass}`} to="/" onClick={logoutClickHandler}>
            <p className='mobile-navigation__user'>{currentUser.name}</p>
            <img src={logout} />
          </Link>
        </li>}
      </ul>
    </nav >
  );
}

export default Mobilenavigation;
