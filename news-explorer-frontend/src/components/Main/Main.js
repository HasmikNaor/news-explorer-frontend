import './Main.css';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';

function Main(props) {
  const isSearchingCards = props.isSearchingCards;
  const articlesLength = props.articles.length;
  const foundArticles = articlesLength > 0;
  const showPreloader = isSearchingCards || !foundArticles;

  return (
    <main className='main'>
      {showPreloader && <Preloader
        isSearchingCards={isSearchingCards}
        setIsSearchingCards={props.setIsSearchingCards}
        foundArticles={foundArticles}
      />}
      {foundArticles && <NewsCardList {...props} />}
      <About />
    </main>
  );
}

export default Main;
