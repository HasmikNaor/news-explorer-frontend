import './Preloader.css';

function Preloader(props) {
  const foundArticles = props.foundArticles;
  const NotFoundImgClass = !foundArticles ? ' preloader__img_not-found' : 'preloader__img_searching';

  return (
    <section className={`preloader ${props.showPreloaderClass}`}>
      <div className={`preloader__img  ${NotFoundImgClass}`}></div>
      {!foundArticles && <h2 className='preloader__title'>Nothing found</h2>}
      <p className={'preloader__subtitle'}>
        {!foundArticles ? 'Sorry, but nothing matched your search terms.' : 'Searching for news...'}
      </p>
    </section>
  );
}

export default Preloader;
