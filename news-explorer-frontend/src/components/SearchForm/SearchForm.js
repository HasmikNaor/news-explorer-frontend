import './SearchForm.css';
import { useRef } from 'react';

function SearchForm(props) {
  const keywordInput = useRef();
  let newKeyword;

  const handleSearch = (e) => {
    newKeyword = keywordInput.current.value;
    props.setShowPreloaderClass('');
    props.onSearch(newKeyword);
    e.preventDefault();
  };

  return (
    <form className='header__form' onSubmit={handleSearch}>
      <input className='header__input' placeholder='Text not entered' ref={keywordInput} />
      <button className='header__button'>Search</button>
    </form>
  );
}

export default SearchForm;
