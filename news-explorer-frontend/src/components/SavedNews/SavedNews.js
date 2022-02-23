import { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './SavedNews.css';

function SavedNews(props) {
  const [numberOfArticles, setNumberOfArticles] = useState(3);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  useEffect(() => {
    if (props.savedArticles.length && numberOfArticles === 3) {
      setIsBtnVisible(true);
    }
  }, [props.savedArticles.length]);

  const handlebtnAppearance = () => {
    if (numberOfArticles >= props.savedArticles.length) {
      setIsBtnVisible(false);
    }
  };

  const handleShowMore = () => {
    const showMoreAmount = 3;
    setNumberOfArticles((numberOfItems) => numberOfItems + showMoreAmount);
  };

  useEffect(() => {
    handlebtnAppearance();
  }, [numberOfArticles]);

  return (
    <section className='articles'>
      <div className='articles__container'>
        <div className="articles__grid">{props.savedArticles.slice(0, numberOfArticles).map((article) => (
          <NewsCard
            savedArticle={article}
            id={article._id}
            key={article._id}
            {...props}
            calledFrom='saved articles'
          />
        ))}
        </div>
        {isBtnVisible && <button className='articles__btn' type='button' onClick={handleShowMore}>Show more</button>}
      </div>
    </section>
  );
}

export default SavedNews;
