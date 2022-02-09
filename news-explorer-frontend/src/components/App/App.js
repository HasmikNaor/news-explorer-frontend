import './App.css';
import React, { useState } from 'react';
import {
  Route,
  Routes,
} from 'react-router-dom';
import users from '../../data/users';

import img1 from '../../images/image_01.png';
import img2 from '../../images/image_04.png';
import img3 from '../../images/image_05.png';
import img4 from '../../images/image_06.png';
import img5 from '../../images/image_08.png';
import Main from '../Main/Main';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import InfoTooltip from '../InfoTooltip/InfoTooltip';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [usersCollection, setUsersCollection] = useState([users]);

  const [isSearchingCards, setIsSearchingCards] = useState(false);
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
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(true);
  const [popupOpenClass, setPopupOpenClass] = useState('');
  const [feedbackPopupOpenClass, setFeedbackPopupOpenClass] = useState('info-popup_open');
  const navMenuOpenClass = isMobileNavOpen ? 'mobile-navigation_open' : '';

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

  const closePopup = () => {
    setIsSignInPopupOpen(false);
    setPopupOpenClass('');
    setIsInfoTooltipOpen(false);
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

  const handleLogin = () => {
    setLoggedIn(true);
  };

  return (
    <div className="app">
      <div className='app__page'>
        {!loggedIn && <Header
          loggedIn={loggedIn}
          isMobileNavOpen={isMobileNavOpen}
          setIsMobileNavOpen={setIsMobileNavOpen}
          navMenuOpenClass={navMenuOpenClass}
          navChangeBackground={navChangeBackground} navMobileCloseBtnClass={navMobileCloseBtnClass} headerDarkBackgroundClass={headerDarkBackgroundClass}
          setIsSearchingCards={setIsSearchingCards}
          onSearch={handleSearchCards}
          setIsSignInPopupOpen={setIsSignInPopupOpen}
          isSignInPopupOpen={isSignInPopupOpen}
          setPopupOpenClass={setPopupOpenClass}
          handleLoggedIn={handleLoggedIn}
        />}

        {loggedIn && <SavedNewsHeader
          user={currentUser}
          loggedIn={loggedIn}
          isMobileNavOpen={isMobileNavOpen}
          setIsMobileNavOpen={setIsMobileNavOpen}
          navMenuOpenClass={navMenuOpenClass} navMobileCloseBtnClass={navMobileCloseBtnClass}
          setLoggedIn={setLoggedIn}
        />}

        <Main
          loggedIn={loggedIn}
          articles={articlesForDisplay}
          isSearchingCards={isSearchingCards}
          setIsSearchingCards={setIsSearchingCards}
        />
        <Routes>
          <Route path={isSignInPopupOpen ? '/signin' : '/signup'} element={<PopupWithForm
            isSignInPopupOpen={isSignInPopupOpen}
            setIsSignInPopupOpen={setIsSignInPopupOpen}
            onClosePopup={closePopup}
            popupOpenClass={popupOpenClass}
            setPopupOpenClass={setPopupOpenClass}
            handleLogin={handleLogin}
            users={usersCollection}
            setUsersCollection={setUsersCollection}
            setIsInfoTooltipOpen={setIsInfoTooltipOpen}
            feedbackPopupOpenClass={feedbackPopupOpenClass}
            setFeedbackPopupOpenClass={setFeedbackPopupOpenClass}
            handleLoggedIn={handleLoggedIn}
          />}
          />
        </Routes>
        {isInfoTooltipOpen && <InfoTooltip
          feedbackPopupOpenClass={feedbackPopupOpenClass}
          setFeedbackPopupOpenClass={setFeedbackPopupOpenClass}
          onClose={closePopup}
          setIsSignInPopupOpen={setIsSignInPopupOpen}
          setPopupOpenClass={setPopupOpenClass}
        />}
        <Footer />
      </div>
    </div>
  );
}

export default App;
