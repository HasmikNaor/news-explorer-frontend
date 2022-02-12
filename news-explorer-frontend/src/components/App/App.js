import './App.css';
import React, { useState, useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import users from '../../data/users';

import img1 from '../../images/image_01.png';
import img2 from '../../images/image_04.png';
import img3 from '../../images/image_05.png';
import img4 from '../../images/image_06.png';
import img5 from '../../images/image_08.png';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [usersCollection, setUsersCollection] = useState([users]);

  const [isSearchingCards, setIsSearchingCards] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const articles = [
    {
      keyword: 'Nature',
      title: 'Everyone Needs a Special "Sit Spot" in Nature',
      text: 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...',
      date: 'November 4, 2020',
      source: 'treehugger',
      image: img1,
      _id: 1,
    },
    {
      keyword: 'Nature',
      title: 'Nature makes you better',
      text: 'We all know how good nature can make us feel. We have known it for millennia: the sound of the ocean, the scents of a forest, the way dappled sunlight dances through leaves.',
      date: 'February 19, 2019',
      source: 'national geographic',
      image: img2,
      _id: 2,
    },
    {
      keyword: 'Yellowstone',
      title: 'Nostalgic Photos of Tourists in U.S. National Parks',
      text: 'Uri Løvevild Golman and Helle Løvevild Golman are National Geographic Explorers and conservation photographers who just completed a project and book they call their love letter to...',
      date: 'October 19, 2020',
      source: 'treehugger',
      image: img3,
      _id: 3,
    },
    {
      keyword: 'Parks',
      title: 'Grand Teton Renews Historic Crest Trail',
      text: '“The linking together of the Cascade and Death Canyon trails, at their heads, took place on October 1, 1933, and marked the first step in the realization of a plan whereby the hiker will be...',
      date: 'November 4, 2020',
      source: 'National parks traveler',
      image: img4,
      _id: 4,
    },
    {
      keyword: 'Nature',
      title: 'Everyone Needs a Special "Sit Spot" in Nature',
      text: 'Ever since I read Richard Louv\'s influential book, "Last Child in the Woods," the idea of having a special "sit spot" has stuck with me. This advice, which Louv attributes to nature educator Jon Young, is for both adults and children to find...',
      date: 'November 4, 2020',
      source: 'treehugger',
      image: img5,
      _id: 5,
    },
  ];
  const [articlesForDisplay, setArticlesForDisplay] = useState(articles);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const length = articles.length;
  const currentUser = {
    name: 'Elise',
    length,
    keywords: ['Nature', 'Yellowstone', 'Parks', 'photograpy'],
  };
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [feedbackPopupOpenClass, setFeedbackPopupOpenClass] = useState('info-popup_open');
  const [linkColorClass, setLinkColorClass] = useState('');
  const [navBackgroundTypeClass, setNavBackgroundTypeClass] = useState('');
  const [currentTypeClass, setCurrentTypeClass] = useState('');
  const [mobileNavTypeClass, setMobileNavTypeClass] = useState('');
  const [mobileLinkTypeClass, setMobileLinkTypeClass] = useState('');
  const navMenuOpenClass = isMobileNavOpen ? 'mobile-navigation_open' : '';
  const location = useLocation();
  const navigate = useNavigate();
  const path = location.pathname;
  // when the user refreshes the page, the page returns to the home page.
  useEffect(() => {
    navigate('/');
  }, []);

  let navChangeBackground;
  let headerDarkBackgroundClass;
  let navMobileCloseBtnClass;

  if (isMobileNavOpen) {
    if (loggedIn) {
      navMobileCloseBtnClass = 'navigation__close-btn_loggedin';
    }
    if (!loggedIn) {
      navMobileCloseBtnClass = 'navigation__close-btn';
    }

    navChangeBackground = navMenuOpenClass ? 'nav-container_change-background' : '';
    headerDarkBackgroundClass = isMobileNavOpen ? 'header__dark-background' : '';
  }
  const navStyleHandler = () => {
    if (path === '/') {
      setCurrentTypeClass('navigation__list-item_current_bright');
      setLinkColorClass('');
      setNavBackgroundTypeClass('');
      setCurrentPage('home');
      setMobileNavTypeClass('mobile-navigation_theme_dark');

      if (isMobileNavOpen) {
        setNavBackgroundTypeClass('nav-container_theme_dark');
        setMobileLinkTypeClass('mobile-navigation__link_type_bright');
      }
    }
    if (path === '/saved-news' && loggedIn) {
      setCurrentTypeClass('navigation__list-item_current_dark');
      setLinkColorClass('navigation__link_type_dark');
      setNavBackgroundTypeClass('navigation_theme_bright');
      setCurrentPage('saved articles');
      setMobileNavTypeClass('mobile-navigation_theme_bright');

      if (isMobileNavOpen) {
        setNavBackgroundTypeClass('nav-container_theme_bright');
        setMobileLinkTypeClass('mobile-navigation__link_type_dark');
      }
    }
  };

  const closePopup = () => {
    setIsSignInPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsRegisterPopupOpen(false);
  };

  const handleLoggedIn = () => {
    setLoggedIn((prevState) => !prevState);
  };

  const handleSearchCards = (keyword) => {
    setIsSearchingCards(true);
    const searchedCards = articles
      .filter((article) => article.keyword.toLowerCase() === keyword.toLowerCase());

    setTimeout(() => {
      setArticlesForDisplay(searchedCards);
    }, 1000);

    setTimeout(() => {
      setIsSearchingCards(false);
    }, 2000);
  };

  return (
    <div className="app">
      <div className='app__page'>
        <Routes>
          <Route path='/' element={
            <Header
              currentUser={currentUser}
              loggedIn={loggedIn}
              handleLoggedIn={handleLoggedIn}
              setIsMobileNavOpen={setIsMobileNavOpen}
              navMenuOpenClass={navMenuOpenClass}
              navChangeBackground={navChangeBackground} navMobileCloseBtnClass={navMobileCloseBtnClass} headerDarkBackgroundClass={headerDarkBackgroundClass}
              setIsMobileNavOpen={setIsMobileNavOpen}
              onSearch={handleSearchCards}
              setIsSignInPopupOpen={setIsSignInPopupOpen}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              navStyleHandler={navStyleHandler}
              linkColorClass={linkColorClass}
              currentTypeClass={currentTypeClass}
              navBackgroundTypeClass={navBackgroundTypeClass}
              mobileNavTypeClass={mobileNavTypeClass}
              mobileLinkTypeClass={mobileLinkTypeClass}
            />
          } />
          <Route path='/signin' element={<>
            <Header
              currentUser={currentUser}
              loggedIn={loggedIn}
              handleLoggedIn={handleLoggedIn}
              setIsMobileNavOpen={setIsMobileNavOpen}
              navMenuOpenClass={navMenuOpenClass}
              navChangeBackground={navChangeBackground} navMobileCloseBtnClass={navMobileCloseBtnClass} headerDarkBackgroundClass={headerDarkBackgroundClass}
              setIsMobileNavOpen={setIsMobileNavOpen}
              onSearch={handleSearchCards}
              setIsSignInPopupOpen={setIsSignInPopupOpen}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              navStyleHandler={navStyleHandler}
              linkColorClass={linkColorClass}
              currentTypeClass={currentTypeClass}
              navBackgroundTypeClass={navBackgroundTypeClass}
              mobileNavTypeClass={mobileNavTypeClass}
              mobileLinkTypeClass={mobileLinkTypeClass}
            />
            <PopupWithForm
              isSignInPopupOpen={isSignInPopupOpen}
              setIsSignInPopupOpen={setIsSignInPopupOpen}
              isRegisterPopupOpen={isRegisterPopupOpen}
              setIsRegisterPopupOpen={setIsRegisterPopupOpen}
              onClosePopup={closePopup}
              handleLoggedIn={handleLoggedIn}
              users={usersCollection}
              setUsersCollection={setUsersCollection}
              setIsInfoTooltipOpen={setIsInfoTooltipOpen}
              feedbackPopupOpenClass={feedbackPopupOpenClass}
              setFeedbackPopupOpenClass={setFeedbackPopupOpenClass}
              handleLoggedIn={handleLoggedIn}
              navStyleHandler={navStyleHandler}
            />
          </>} />
          <Route path='/signup' element={<>
            <Header
              currentUser={currentUser}
              loggedIn={loggedIn}
              handleLoggedIn={handleLoggedIn}
              setIsMobileNavOpen={setIsMobileNavOpen}
              navMenuOpenClass={navMenuOpenClass}
              navChangeBackground={navChangeBackground} navMobileCloseBtnClass={navMobileCloseBtnClass} headerDarkBackgroundClass={headerDarkBackgroundClass}
              setIsMobileNavOpen={setIsMobileNavOpen}
              onSearch={handleSearchCards}
              setIsSignInPopupOpen={setIsSignInPopupOpen}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
              navStyleHandler={navStyleHandler}
              linkColorClass={linkColorClass}
              currentTypeClass={currentTypeClass}
              navBackgroundTypeClass={navBackgroundTypeClass}
              mobileNavTypeClass={mobileNavTypeClass}
              mobileLinkTypeClass={mobileLinkTypeClass}
            />
            <PopupWithForm
              isSignInPopupOpen={isSignInPopupOpen}
              setIsSignInPopupOpen={setIsSignInPopupOpen}
              isRegisterPopupOpen={isRegisterPopupOpen}
              setIsRegisterPopupOpen={setIsRegisterPopupOpen}
              onClosePopup={closePopup}
              handleLoggedIn={handleLoggedIn}
              users={usersCollection}
              setUsersCollection={setUsersCollection}
              setIsInfoTooltipOpen={setIsInfoTooltipOpen}
              feedbackPopupOpenClass={feedbackPopupOpenClass}
              setFeedbackPopupOpenClass={setFeedbackPopupOpenClass}
              handleLoggedIn={handleLoggedIn}
              navStyleHandler={navStyleHandler}
            />
          </>} />
          <Route path='/saved-news' element={<SavedNewsHeader
            loggedIn={loggedIn}
            currentUser={currentUser}
            isMobileNavOpen={isMobileNavOpen}
            setIsMobileNavOpen={setIsMobileNavOpen}
            navMenuOpenClass={navMenuOpenClass} navMobileCloseBtnClass={navMobileCloseBtnClass}
            setLoggedIn={setLoggedIn}
            setCurrentPage={setCurrentPage}
            currentPage={currentPage}
            navStyleHandler={navStyleHandler}
            linkColorClass={linkColorClass}
            currentTypeClass={currentTypeClass}
            navBackgroundTypeClass={navBackgroundTypeClass}
            mobileNavTypeClass={mobileNavTypeClass}
            mobileLinkTypeClass={mobileLinkTypeClass}
          />} />
        </Routes>

        {isInfoTooltipOpen && <InfoTooltip
          feedbackPopupOpenClass={feedbackPopupOpenClass}
          setFeedbackPopupOpenClass={setFeedbackPopupOpenClass}
          onClose={closePopup}
          setIsSignInPopupOpen={setIsSignInPopupOpen}
        />}

        <Main
          loggedIn={loggedIn}
          articles={articlesForDisplay}
          isSearchingCards={isSearchingCards}
          setIsSearchingCards={setIsSearchingCards}
        />
        <Footer
        />
      </div>
    </div>
  );
}

export default App;
