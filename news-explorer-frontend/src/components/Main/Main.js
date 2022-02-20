import './Main.css';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';
import SavedNews from '../SavedNews/SavedNews';

function Main(props) {
  const currentPage = props.currentPage;
  const showPreloader = props.showPreloaderClass;
  return (
    <main className='main'>
      {showPreloader && currentPage === 'home' && <Preloader {...props} />}

      {currentPage === 'home' && <NewsCardList {...props} />}
      {currentPage === 'saved articles' && <SavedNews {...props} />}

      {currentPage === 'home' && <About />}
    </main>
  );
}

export default Main;
