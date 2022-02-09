import './Main.css';
import About from '../../components/About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';

function Main(props) {
  // const isFoudCardByKeword = props.isFoudCardByKeword;
  const isSearchingCards = props.isSearchingCards;
  const articlesLength = props.articles.length;
  const foundArticles = articlesLength > 0;
  const showPreloader = isSearchingCards || !foundArticles
  return (
    <main className='main'>
      {showPreloader && <Preloader
        // isFoudCardByKeword={isFoudCardByKeword}
        isSearchingCards={isSearchingCards}
        setIsSearchingCards={props.setIsSearchingCards}
        foundArticles={foundArticles}
      />}
      {foundArticles && <NewsCardList
        articles={props.articles}
        loggedIn={props.loggedIn}
      />}
      <About />
    </main>
  )
}

export default Main;
