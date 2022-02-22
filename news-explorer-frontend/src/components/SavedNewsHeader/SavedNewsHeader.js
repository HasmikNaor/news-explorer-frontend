import { useContext, useState, useEffect } from 'react';
import './SavedNewsHeader.css';
import Navigation from '../Navigation/Navigation';
import currentUser from '../../contexts/CurrentUserContext';

function SavedNewsHeader(props) {
  const [sum, setSum] = useState(0);
  const user = useContext(currentUser);
  const arrayOfKeywords = props.arrayOfKeywords;
  const length = arrayOfKeywords.length;

  const countArticles = () => {
    if (arrayOfKeywords.length) {
      setSum(arrayOfKeywords.reduce((prev, current) => prev + current[1], 0));
    }
    else setSum(0);
  };

  useEffect(() => {
    countArticles();
  });
  return (
    <header className='loggedin-header'>
      <Navigation {...props} />
      <div className='loggedin-header__content'>
        <h2 className='loggedin-header__title'>Saved articles</h2>
        <p className='loggedin-header__info'>{user.name}, you have {sum} saved articles</p>
        {length > 2 && <p className='loggedin-header__keywords-container'>By keywords
          <span className='loggedin-header__keywords'> {arrayOfKeywords[0][0]}, {arrayOfKeywords[1][0]}{length > 3 ? ` and ${length - 2} other` : `, ${arrayOfKeywords[2][0]}`}
          </span>
        </p>}
      </div>
    </header>
  );
}

export default SavedNewsHeader;
