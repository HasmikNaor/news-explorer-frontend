import './NewsCard.css';
import { useState } from 'react';

function NewCard(props) {
  const loggedIn = props.loggedIn;
  const currentPage = props.currentPage;
  const loggedInHomePage = loggedIn && currentPage === 'home';
  const savedArticlesPage = loggedIn && currentPage === 'saved articles';
  const {
    image,
    title,
    date,
    text,
    keyword,
    source,
  } = props.article;
  const [isHoverTextVisisble, setIsHoverTextVisisble] = useState('');

  return (
    <div className='articles__article'>
      <article className='articles__img-container'>
        <img src={image} className='articles__img' alt='article-img' />

        {!loggedIn && <p className={`articles__hover-text articles__hover-text_signin ${isHoverTextVisisble}`}>Signin to save articles
        </p>}

        {loggedInHomePage && <p className={`articles__hover-text articles__hover-text_signin ${isHoverTextVisisble}`}> Save article
        </p>}

        {(!loggedIn || loggedInHomePage) && <button type='button'
          className='articles__signin-btn'
          onMouseEnter={() => setIsHoverTextVisisble('articles__hover-text_visible')}
          onMouseLeave={() => setIsHoverTextVisisble('')}>
        </button>}

        {loggedIn && <p className='articles__keyword'>{keyword}</p>}

        {savedArticlesPage && <p className={`articles__hover-text ${isHoverTextVisisble}`}>Remove from Saved</p>}

        {savedArticlesPage && <button className='articles__trash-btn'
          onMouseEnter={() => setIsHoverTextVisisble('articles__hover-text_visible')}
          onMouseLeave={() => setIsHoverTextVisisble('')}>
        </button>}

        <p className='articles__date'>
          {date}
        </p>
      </article>
      <div className='articles__content'>
        <h3 className='articles__title'>{title}</h3>
        <p className='articles__text'>{text}</p>
        <p className='articles__source'>{source}</p>
      </div>
    </div>
  );
}

export default NewCard;
