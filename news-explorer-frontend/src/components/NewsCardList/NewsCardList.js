import { useState, useEffect } from 'react';
import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList(props) {
  const [numberOfArticles, setNumberOfArticles] = useState(3);
  const [isBtnVisible, setIsBtnVisible] = useState(false);

  useEffect(() => {
    if (props.articles.length && numberOfArticles === 3) {
      setIsBtnVisible(true);
    }
  }, [props.articles.length]);

  const handlebtnAppearance = () => {
    if (numberOfArticles >= props.articles.length) {
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
        <h2 className='articles__grid-title'>Search results</h2>

        <div className="articles__grid">{props.articles.slice(0, numberOfArticles).map((article, index) => (
          <NewsCard
            {...props}
            article={article}
            index={index}
            key={index}
            calledFrom='home'
          />
        ))}
        </div>
        {isBtnVisible && <button className='articles__btn' type='button' onClick={handleShowMore}>Show more</button>}
      </div>
    </section>
  );
}

export default NewsCardList;
