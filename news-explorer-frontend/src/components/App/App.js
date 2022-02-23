import './App.css';
import React, { useState, useEffect } from 'react';
import {
  Route,
  Routes,
  useLocation,
  useNavigate,
} from 'react-router-dom';
import { getContent } from '../../utils/auth';
import { api } from '../../utils/api';
import Main from '../Main/Main';
import Footer from '../Footer/Footer';
import ProtectedRoute from '../ProtectedRoute/ProtectedRoute';
import InfoTooltip from '../InfoTooltip/InfoTooltip';
import Header from '../Header/Header';
import Register from '../Register/Register';
import Login from '../Login/Login';
import getArticles from '../../utils/MainApi';
import CurrentUser from '../../contexts/CurrentUserContext';
import SavedNewsPage from '../SavedNewsMain/SavedNewsPage';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [isMobileNavOpen, setIsMobileNavOpen] = useState(false);
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

  const createKeywordsList = () => {
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
    const articles = localStorage.getItem('articles');
    console.log('test');
    if (articles !== null) {
      setArticles(JSON.parse(articles));
    }
  }, []);

  useEffect(() => {
    createKeywordsList(savedArticles);
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
    api.updateHeaders(token);
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
          setSavedArticles(res);
        })
        .catch((error) => console.log(error));
    }
  }, [loggedIn]);

  const styleMobileNav = () => {
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

  const styleNavbar = () => {
    if (path === '/') {
      setCurrentPage('home');
      setCurrentTypeClass('navigation__list-item_bright-border');
      setLinkColorClass('');
      setNavBackgroundTypeClass('');
      setMobileNavTypeClass('mobile-navigation_theme_dark');
      setNavMobileBtnClass('navigation__mobile-btn_menu_bright');
      setHeaderDarkOverlay('');

      styleMobileNav();
    }
    if (path === '/saved-news' && loggedIn) {
      setCurrentPage('saved articles');
      setCurrentTypeClass('navigation__list-item_dark-border');
      setLinkColorClass('navigation__link_type_dark');
      setNavBackgroundTypeClass('navigation_theme_bright');
      setMobileNavTypeClass('mobile-navigation_theme_bright');
      setNavMobileBtnClass('navigation__mobile-btn_menu_dark');

      styleMobileNav();
    }
  };

  const showPopup = () => {
    if (path === '/signin') {
      setIsSignInPopupOpen(true);
    }
    if (path === '/signup') {
      setIsRegisterPopupOpen(true);
    }
  };

  const changeCurrentPage = () => {
    if (path === '/') {
      setCurrentPage('home');
    }
    if (path === '/saved-news') {
      setCurrentPage('saved articles');
    }
  };

  useEffect(() => {
    showPopup();
    changeCurrentPage();
  }, [path]);

  useEffect(() => {
    styleNavbar();
  }, [isMobileNavOpen, currentPage]);

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
        localStorage.setItem('articles', JSON.stringify(res.articles));
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

  const saveArticle = (data) => {
    if (loggedIn) {
      api.saveArticle(data)
        .then((article) => {
          const newArticle = { title: data.title, ...article };
          setSavedArticles([newArticle, ...savedArticles]);
        })
        .catch((err) => console.log(err));
    }
  };

  const deleteArticle = (article) => {
    api.deleteArticle(article._id)
      .then(() => {
        setSavedArticles((articles) => articles.filter((art) => art._id !== article._id));
      })
      .catch((err) => console.log(err));
  };

  const removeMarkup = (data) => {
    const article = savedArticles.find((article) => article.link === data.link);

    if (article) {
      deleteArticle(article);
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
                styleNavbar={styleNavbar}
                linkColorClass={linkColorClass}
                currentTypeClass={currentTypeClass}
                navBackgroundTypeClass={navBackgroundTypeClass}
                mobileNavTypeClass={mobileNavTypeClass}
                mobileLinkTypeClass={mobileLinkTypeClass}
                navMobileBtnClass={navMobileBtnClass}
                setToken={setToken}
                setShowPreloaderClass={setShowPreloaderClass}
                arrayOfKeywords={arrayOfKeywords}
                keyword={keyword}
                setKeyword={setKeyword}
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
                styleNavbar={styleNavbar}
                linkColorClass={linkColorClass}
                currentTypeClass={currentTypeClass}
                navBackgroundTypeClass={navBackgroundTypeClass}
                mobileNavTypeClass={mobileNavTypeClass}
                mobileLinkTypeClass={mobileLinkTypeClass}
                navMobileBtnClass={navMobileBtnClass}
                setToken={setToken}
                setShowPreloaderClass={setShowPreloaderClass}
                arrayOfKeywords={arrayOfKeywords}
                keyword={keyword}
                setKeyword={setKeyword}
              />
              <Login
                isOpen={isSignInPopupOpen}
                setIsOpen={setIsSignInPopupOpen}
                onClosePopup={closePopup}
                handleLoggedIn={handleLoggedIn}
                setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                feedbackPopupOpenClass={feedbackPopupOpenClass}
                setFeedbackPopupOpenClass={setFeedbackPopupOpenClass}
                styleNavbar={styleNavbar}
                setToken={setToken}
                setCurrentUser={setCurrentUser}
                setIsRegisterPopupOpen={setIsRegisterPopupOpen}
                setIsSignInPopupOpen={setIsSignInPopupOpen}
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
                styleNavbar={styleNavbar}
                linkColorClass={linkColorClass}
                currentTypeClass={currentTypeClass}
                navBackgroundTypeClass={navBackgroundTypeClass}
                mobileNavTypeClass={mobileNavTypeClass}
                mobileLinkTypeClass={mobileLinkTypeClass}
                navMobileBtnClass={navMobileBtnClass}
                setToken={setToken}
                setShowPreloaderClass={setShowPreloaderClass}
                arrayOfKeywords={arrayOfKeywords}
                keyword={keyword}
                setKeyword={setKeyword}
              />
              <Register
                isOpen={isRegisterPopupOpen}
                setIsOpen={setIsRegisterPopupOpen}
                onClosePopup={closePopup}
                handleLoggedIn={handleLoggedIn}
                setIsInfoTooltipOpen={setIsInfoTooltipOpen}
                feedbackPopupOpenClass={feedbackPopupOpenClass}
                setFeedbackPopupOpenClass={setFeedbackPopupOpenClass}
                styleNavbar={styleNavbar}
                setToken={setToken}
                setCurrentUser={setCurrentUser}
                setIsSignInPopupOpen={setIsSignInPopupOpen}
                setIsRegisterPopupOpen={setIsRegisterPopupOpen}
              />
            </>} />
            <Route path='/saved-news' element={
              <ProtectedRoute
                component={SavedNewsPage}
                loggedIn={loggedIn}
                handleLoggedIn={handleLoggedIn}
                arrayOfKeywords={arrayOfKeywords}
                currentUser={currentUser}
                isMobileNavOpen={isMobileNavOpen}
                setIsMobileNavOpen={setIsMobileNavOpen}
                navMenuOpenClass={navMenuOpenClass}
                setLoggedIn={setLoggedIn}
                setCurrentPage={setCurrentPage}
                currentPage={currentPage}
                styleNavbar={styleNavbar}
                linkColorClass={linkColorClass}
                currentTypeClass={currentTypeClass}
                navBackgroundTypeClass={navBackgroundTypeClass}
                mobileNavTypeClass={mobileNavTypeClass}
                mobileLinkTypeClass={mobileLinkTypeClass}
                navMobileBtnClass={navMobileBtnClass}
                setToken={setToken}
                savedArticles={savedArticles}
                setShowPreloaderClass={setShowPreloaderClass}
                onArticleDelete={deleteArticle}
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
            onSaveArticle={saveArticle}
            currentUser={currentUser}
            onArticleDelete={deleteArticle}
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
