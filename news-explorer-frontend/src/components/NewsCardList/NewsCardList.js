import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList(props) {
  const loggedIn = props.loggedIn;

  return (
    <section className='articles'>
      <div className='articles__container'>
        {!loggedIn && <h2 className='articles__grid-title'>Search results</h2>}

        <div className="articles__grid">{props.articles.map((article) => (
          <NewsCard
            article={article}
            key={article._id}
            {...props} />
        ))}
        </div>
        <button className='articles__btn' type='reset'>Show more</button>
      </div>
    </section>
  );
}

export default NewsCardList;
