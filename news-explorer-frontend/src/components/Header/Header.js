import Navigation from '../Navigation/Navigation';
import SearchForm from '../SearchForm/SearchForm';

function Header(props) {
  console.log(props.headerDarkOverlay);
  return (
    <header className={`header ${props.headerDarkOverlay}`}>
      <Navigation {...props} />
      <div className='header__content'>
        <div className='header__description'>
          <h1 className='header__title'>What's going on in the world?</h1>
          <p className='header__subtitle'>Find the latest news on any topic and save them in your personal account</p>
        </div>
        <SearchForm
          onSearch={props.onSearch}
        />
      </div>
    </header>
  );
}

export default Header;
