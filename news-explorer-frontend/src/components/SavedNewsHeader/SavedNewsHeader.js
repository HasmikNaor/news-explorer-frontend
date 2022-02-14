import './SavedNewsHeader.css';
import Navigation from '../Navigation/Navigation';

function SavedNewsHeader(props) {
  const { name, length, keywords } = props.currentUser;
  const kewordsLength = keywords.length;
  return (
    <header className='loggedin-header'>
      <Navigation {...props} />
      <div className='loggedin-header__content'>
        <h2 className='loggedin-header__title'>Saved articles</h2>
        <p className='loggedin-header__info'>{name}, you have {length} saved articles</p>
        <p className='loggedin-header__keywords-container'>By keywords <span className='loggedin-header__keywords'>{keywords[0]}, {keywords[1]} and {kewordsLength - 2} other</span></p>
      </div>
    </header>
  );
}

export default SavedNewsHeader;
