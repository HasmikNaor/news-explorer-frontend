import './SearchForm.css';
import { useRef } from 'react';

function SearchForm(props) {
  const keywordInput = useRef();

  const handleSearch = (e) => {
    const keyword = keywordInput.current.value;
    props.setShowPreloaderClass('');
    props.onSearch(keyword);

    e.preventDefault();
  };

  return (
    <form className='header__form'>
      <input className='header__input' placeholder='Text not entered' ref={keywordInput} />
      <button className='header__button' onClick={handleSearch}>Search</button>
    </form>
  );
}

export default SearchForm;
