import './Main.css';
import About from '../About/About';
import NewsCardList from '../NewsCardList/NewsCardList';
import Preloader from '../Preloader/Preloader';

function Main(props) {
  const currentPage = props.currentPage;
  const showPreloader = props.showPreloaderClass;

  return (
    <main className='main'>
      {showPreloader && currentPage === 'home' && <Preloader {...props} />}

      {currentPage === 'home' && <NewsCardList {...props} />}

      {currentPage === 'home' && <About />}
    </main>
  );
}

export default Main;
