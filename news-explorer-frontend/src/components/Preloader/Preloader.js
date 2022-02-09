import './Preloader.css';

function Preloader(props) {
  const foundArticles = props.foundArticles;
  const isSearchingCards = props.isSearchingCards;

  const NotFoundImgClass = !foundArticles && !isSearchingCards ? 'preloader__img_not-found' : '';
  const serchRotationClass = isSearchingCards ? 'preloader__img_searching' : '';
  return (
    <section className='preloader'>
      <div className={`preloader__img ${NotFoundImgClass} ${serchRotationClass}`}></div>

      {isSearchingCards && <p className='preloader__subtitle'>Searching for news...</p>}

      {!foundArticles && !isSearchingCards && <div className='preloader__info preloader__info_failed'>
        <h2 className='preloader__title'>Nothing found</h2>
        <p className='preloader__subtitle'>Sorry, but nothing matched your search terms.</p>
      </div>}
    </section>
  );
}

export default Preloader;
