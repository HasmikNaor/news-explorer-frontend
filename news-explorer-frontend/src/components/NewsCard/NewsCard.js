import './NewsCard.css';
import { useState, useEffect, useContext } from 'react';
import currentUser from '../../contexts/CurrentUserContext';

function NewCard(props) {
  const loggedIn = props.loggedIn;
  const currentPage = props.currentPage;
  const loggedInHomePage = loggedIn && currentPage === 'home';
  const savedArticlesPage = loggedIn && currentPage === 'saved articles';
  const keyword = props.keyword;
  const [isHoverTextVisisble, setIsHoverTextVisisble] = useState('');
  const [articleWasSaved, setArticleWasSaved] = useState();
  const [data, setData] = useState({});
  const key = props.index || props.id;
  const user = useContext(currentUser);

  const modifyDateType = (publishedAt) => {
    let date = new Date(publishedAt.toString());
    const month = date.toLocaleString('en-us', { month: 'long' });
    const day = date.getDate();
    const year = date.getFullYear();
    date = `${month} ${day}, ${year}`;

    return date;
  };
  useEffect(() => {
    let articleData;
    if (currentPage === 'home') {
      articleData = props.article;
      const date = modifyDateType(articleData.publishedAt);
      setData({
        source: articleData.source.name,
        image: articleData.urlToImage,
        link: articleData.url,
        title: articleData.title,
        text: articleData.description,
        date,
        keyword,
      });
    }
    if (currentPage === 'saved articles') {
      articleData = props.savedArticle;
      setData({ ...articleData });
    }
  }, [keyword]);

  const checkSavedArticles = () => {
    const checkIfSaved = props.savedArticles.find((savedArticle) => savedArticle.link === data.link);
    if (checkIfSaved && loggedIn) {
      setArticleWasSaved('articles__save-btn_clicked');
    }
    else {
      setArticleWasSaved('');
    }
  };

  useEffect(() => {
    if (props.currentPage === 'home') {
      checkSavedArticles();
    }
  }, [props.savedArticles.length, data]);

  const handleMarkArticleBtn = (e) => {
    const isMarked = e.target.classList.contains('articles__save-btn_clicked');
    if (isMarked) {
      props.onRemoveMarkup(data);
    }
    else {
      props.onSaveArticle(data);
    }
  };

  const deleteArticleHandler = () => {
    const isOwner = (props.savedArticle.owner === user.id);
    if (isOwner) {
      props.onArticleDelete(data);
    }
  };

  return (
    <div className='articles__article' key={key}>
      <article className='articles__img-container'>
        <img src={data.image} className='articles__img' alt='article-img' />

        {!loggedIn && <p className={`articles__hover-text articles__hover-text_signin ${isHoverTextVisisble}`}>Signin to save articles
        </p>}

        {loggedInHomePage && !articleWasSaved && <p className={`articles__hover-text articles__hover-text_signin ${isHoverTextVisisble}`}> Save article
        </p>}

        {(!loggedIn || loggedInHomePage) && <button type='button'
          className={`articles__save-btn ${articleWasSaved}`}
          onMouseEnter={() => setIsHoverTextVisisble('articles__hover-text_visible')}
          onMouseLeave={() => setIsHoverTextVisisble('')}
          onClick={handleMarkArticleBtn}
        >
        </button>}

        {currentPage === 'saved articles' && <p className='articles__keyword'>{data.keyword}</p>}

        {savedArticlesPage && <p className={`articles__hover-text ${isHoverTextVisisble}`}>Remove from Saved</p>}

        {savedArticlesPage && <button className='articles__trash-btn'
          onMouseEnter={() => setIsHoverTextVisisble('articles__hover-text_visible')}
          onMouseLeave={() => setIsHoverTextVisisble('')}
          onClick={deleteArticleHandler}
        >
        </button>}

        <p className='articles__date'>
          {data.date}
        </p>
      </article>
      <div className='articles__content'>
        <h3 className='articles__title'>{data.title}</h3>
        <p className='articles__text'>{data.text}</p>
        <p className='articles__source'>{data.source}</p>
      </div>
    </div>
  );
}

export default NewCard;
