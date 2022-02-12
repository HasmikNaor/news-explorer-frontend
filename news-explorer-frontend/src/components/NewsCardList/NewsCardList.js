import NewsCard from '../NewsCard/NewsCard';
import './NewsCardList.css';

function NewsCardList(props) {
  const loggedIn = props.loggedIn;

  return (
    <section className='articles'>
      <div className='articles__container'>
        {!loggedIn && <h2 className='articles__grid-title'>Search results</h2>}

        <div className="articles__grid">{props.articles.map((article) => (
          <NewsCard onCardClick={props.onCardClick} article={article} key={article._id} onCardDelete={props.onCardDelete} loggedIn={props.loggedIn} />
        ))}
        </div>
        <button className='articles__btn' type='reset'>Show more</button>
      </div>
    </section>
  );
}

export default NewsCardList;
