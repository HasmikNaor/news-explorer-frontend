import './App.css';
import React, { useState, useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { getContent } from '../../utils/auth';
import users from '../../data/users';
import { api } from '../../utils/api';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import SavedNewsHeader from '../SavedNewsHeader/SavedNewsHeader';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Header from '../Header/Header';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import getArticles from '../../utils/MainApi';
import CurrentUser from '../../contexts/CurrentUserContext';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
  const [usersCollection, setUsersCollection] = useState([users]);
  const [isSearchingCards, setIsSearchingCards] = useState(false);
  const [currentPage, setCurrentPage] = useState('');
  const [articles, setArticles] = useState([]);
  const [foundArticles, setFoundArticles] = useState(true);// start with ture - otherwise the first search will show that couldn't find articles.
  const [savedArticles, setSavedArticles] = useState([]);
  const [isInfoTooltipOpen, setIsInfoTooltipOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState({
    name: '',
    id: '',
  });
  const [isSignInPopupOpen, setIsSignInPopupOpen] = useState(false);
  const [isRegisterPopupOpen, setIsRegisterPopupOpen] = useState(false);
  const [feedbackPopupOpenClass, setFeedbackPopupOpenClass] = useState('info-popup_open');
  const [linkColorClass, setLinkColorClass] = useState('');
  const [navBackgroundTypeClass, setNavBackgroundTypeClass] = useState('');
  const [currentTypeClass, setCurrentTypeClass] = useState('');
  const [mobileNavTypeClass, setMobileNavTypeClass] = useState('');
  const [mobileLinkTypeClass, setMobileLinkTypeClass] = useState('');
  const [navMobileBtnClass, setNavMobileBtnClass] = useState('');
  const [headerDarkOverlay, setHeaderDarkOverlay] = useState('');
  const [showPreloaderClass, setShowPreloaderClass] = useState('');
  const navMenuOpenClass = isMobileNavOpen ? 'mobile-navigation_open' : '';
  const location = useLocation();
  const [token, setToken] = useState(localStorage.getItem('token'));
  const [keyword, setKeyword] = useState('');
  const [keywordsList, setKeywordsList] = useState({});
  const [arrayOfKeywords, setArrayOfKeywords] = useState([]);
  const navigate = useNavigate();
  const path = location.pathname;

  const orderKeywordsArray = () => {
    const highestToLowest = Object.entries(keywordsList).sort((a, b) => b[1] - a[1]);
    setArrayOfKeywords(highestToLowest);
  };

  const handleKeywordsList = () => {
    let keywords = {};
    savedArticles.forEach((article) => {
      const newKeyword = {};
      if (!(article.keyword in keywords)) {
        newKeyword[article.keyword] = 1;
        keywords = { ...keywords, ...newKeyword };
      }
      else {
        keywords[article.keyword]++;
      }
    });
    setKeywordsList(keywords);
  };

  useEffect(() => {
    handleKeywordsList(savedArticles);
  }, [savedArticles]);

  useEffect(() => {
    orderKeywordsArray();
  }, [keywordsList]);

  // after authorization get the content of the page
  const tokenCheck = (jwt) => {
    // check that the user has a valid token
    if (jwt) {
      getContent(jwt) // verifies the token
        .then((res) => {
          if (res) {
            setCurrentUser({
              name: res[0].name,
              id: res[0]._id,
            });
            setLoggedIn(true);

            navigate('/saved-news');
          }
        })
        .catch((err) => console.log(err));
    }
  }; // Now, if a user logs in and leaves the page,
  // when they return, everything will appear right where they left it

  useEffect(() => {
    api._headers = { authorization: `Bearer ${token}`, 'Content-Type': 'application/json' };
    tokenCheck(token);
  }, [token]);

  useEffect(() => {
    if (loggedIn) {
      api.getUserInfo()
        .then((res) => {
          setCurrentUser({
            name: res[0].name,
            id: res[0]._id,
          });
        })
        .catch((error) => console.log(error));
      api.getInitialArticles()
        .then((res) => {
          // console.log('test', res);
          setSavedArticles(res);
        });
    }
  }, [loggedIn]);

  const mobileNavStyleHandler = () => {
    if (isMobileNavOpen && path === '/') {
      setNavBackgroundTypeClass('nav-container_theme_dark');
      setMobileLinkTypeClass('mobile-navigation__link_type_bright');
      setNavMobileBtnClass('navigation__mobile-btn_close_bright');
      setHeaderDarkOverlay('header_dark-overlay');
    }

    if (isMobileNavOpen && path === '/saved-news') {
      setNavBackgroundTypeClass('nav-container_theme_bright');
      setMobileLinkTypeClass('mobile-navigation__link_type_dark');
      setNavMobileBtnClass('navigation__mobile-btn_close_dark');
    }
  };

  const navStyleHandler = () => {
    if (path === '/') {
      setCurrentTypeClass('navigation__list-item_bright-border');
      setLinkColorClass('');
      setNavBackgroundTypeClass('');
      setCurrentPage('home');
      setMobileNavTypeClass('mobile-navigation_theme_dark');
      setNavMobileBtnClass('navigation__mobile-btn_menu_bright');
      setHeaderDarkOverlay('');

      mobileNavStyleHandler();
    }
    if (path === '/saved-news') {
      setCurrentTypeClass('navigation__list-item_dark-border');
      setLinkColorClass('navigation__link_type_dark');
      setNavBackgroundTypeClass('navigation_theme_bright');
      setCurrentPage('saved articles');
      setMobileNavTypeClass('mobile-navigation_theme_bright');
      setNavMobileBtnClass('navigation__mobile-btn_menu_dark');

      mobileNavStyleHandler();
    }
  };

  useEffect(() => {
    navStyleHandler();
  }, [isMobileNavOpen]);

  const closePopup = () => {
    setIsSignInPopupOpen(false);
    setIsInfoTooltipOpen(false);
    setIsRegisterPopupOpen(false);
  };

  const handleLoggedIn = () => {
    setLoggedIn((prevState) => !prevState);
  };

  const handleSearchCards = (keyword) => {
    setShowPreloaderClass('preloader_visible');
    getArticles(keyword)
      .then((res) => {
        setArticles(res.articles);
        if (res.articles.length) {
          setFoundArticles(true);
          setShowPreloaderClass('');
          setIsSearchingCards(false);
        } else {
          setFoundArticles(false);
        }
        setKeyword(keyword);
      })
      .catch((err) => {
        setFoundArticles(false);
        console.log('err', err);
      });
  };

  const SaveArticleHandler = (data) => {
    if (loggedIn) {
      api.saveArticle(data)
        .then((article) => {
          const newArticle = { title: data.title, ...article };
          setSavedArticles([newArticle, ...savedArticles]);
        })
        .catch((err) => console.log(err));
    }
  };

  const articleDeleteHandler = (article) => {
    api.deleteArticle(article._id)
      .then(() => {
        setSavedArticles((articles) => articles.filter((art) => art._id !== article._id));
        // subtractFromKeywords(article.keyword);
      })
      .catch((err) => console.log(err));
  };

  const removeMarkup = (data) => {
    // const articleId = savedArticles.find((article) => article.link === data.link)._id;
    const article = savedArticles.find((article) => article.link === data.link);

    if (article) {
      articleDeleteHandler(article);
    }
  };
  return (
    <CurrentUser.Provider value={currentUser}>
      <div className='app'>
        <div className='app__page'>
          <Routes>
            <Route path='/' element={
              <Header
                loggedIn={loggedIn}
                handleLoggedIn={handleLoggedIn}
                setIsMobileNavOpen={setIsMobileNavOpen}
                navMenuOpenClass={navMenuOpenClass}
                headerDarkOverlay={headerDarkOverlay}
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
                navMobileBtnClass={navMobileBtnClass}
                setToken={setToken}
                setShowPreloaderClass={setShowPreloaderClass}
                arrayOfKeywords={arrayOfKeywords}
              />
            } />
            <Route path='/signin' element={<>
              <Header
                loggedIn={loggedIn}
                handleLoggedIn={handleLoggedIn}
                setIsMobileNavOpen={setIsMobileNavOpen}
                navMenuOpenClass={navMenuOpenClass}
                headerDarkOverlay={headerDarkOverlay}
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
                navMobileBtnClass={navMobileBtnClass}
                setToken={setToken}
                setShowPreloaderClass={setShowPreloaderClass}
                arrayOfKeywords={arrayOfKeywords}
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
                navStyleHandler={navStyleHandler}
                setToken={setToken}
                setCurrentUser={setCurrentUser}
              />
            </>} />
            <Route path='/signup' element={<>
              <Header
                loggedIn={loggedIn}
                handleLoggedIn={handleLoggedIn}
                setIsMobileNavOpen={setIsMobileNavOpen}
                navMenuOpenClass={navMenuOpenClass}
                headerDarkOverlay={headerDarkOverlay}
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
                navMobileBtnClass={navMobileBtnClass}
                setToken={setToken}
                setShowPreloaderClass={setShowPreloaderClass}
                arrayOfKeywords={arrayOfKeywords}
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
                navStyleHandler={navStyleHandler}
                setToken={setToken}
                setCurrentUser={setCurrentUser}
              />
            </>} />
            <Route path='/saved-news' element={
              <ProtectedRoute
                component={SavedNewsHeader}
                arrayOfKeywords={arrayOfKeywords}
                loggedIn={loggedIn}
                handleLoggedIn={handleLoggedIn}
                currentUser={currentUser}
                isMobileNavOpen={isMobileNavOpen}
                setIsMobileNavOpen={setIsMobileNavOpen}
                navMenuOpenClass={navMenuOpenClass}
                setLoggedIn={setLoggedIn}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                navStyleHandler={navStyleHandler}
                linkColorClass={linkColorClass}
                currentTypeClass={currentTypeClass}
                navBackgroundTypeClass={navBackgroundTypeClass}
                mobileNavTypeClass={mobileNavTypeClass}
                mobileLinkTypeClass={mobileLinkTypeClass}
                navMobileBtnClass={navMobileBtnClass}
                setToken={setToken}
                setShowPreloaderClass={setShowPreloaderClass}
              />} />
          </Routes>

          {isInfoTooltipOpen && <InfoTooltip
            feedbackPopupOpenClass={feedbackPopupOpenClass}
            setFeedbackPopupOpenClass={setFeedbackPopupOpenClass}
            onClose={closePopup}
            setIsSignInPopupOpen={setIsSignInPopupOpen}
          />}

          <Main
            articles={articles}
            loggedIn={loggedIn}
            foundArticles={foundArticles}
            savedArticles={savedArticles}
            setSavedArticles={setSavedArticles}
            keyword={keyword}
            isSearchingCards={isSearchingCards}
            setIsSearchingCards={setIsSearchingCards}
            currentPage={currentPage}
            onSaveArticle={SaveArticleHandler}
            currentUser={currentUser}
            onArticleDelete={articleDeleteHandler}
            onRemoveMarkup={removeMarkup}
            showPreloaderClass={showPreloaderClass}
          />
          <Footer
          />
        </div>
      </div>
    </CurrentUser.Provider>
  );
}

export default App;
