import { useNavigate, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import closebtn from '../../images/close.svg';
import './PopupWithForm.css';

function PopupWithForm(props) {
  const [submitButtonClass, setSubmitButtonClass] = useState('popup__submit-btn_disabled');
  const formIsOpen = props.isOpen ? 'popup_open' : '';

  const navigate = useNavigate();

  const toggleBtnState = () => {
    if (props.isFormValid) {
      setSubmitButtonClass('');
    }
    if (!props.isFormValid) {
      setSubmitButtonClass('popup__submit-btn_disabled');
    }
  };

  useEffect(() => {
    toggleBtnState();
  }, [props.isFormValid]);

  const close = () => {
    props.onClosePopup();
    navigate('/');
  };

  const handleClickOnOverlayClose = () => {
    close();
  };

  return (
    <div className={`popup ${formIsOpen}`} onClick={handleClickOnOverlayClose} tabIndex='0'>
      <div className='popup__content' onClick={(e) => e.stopPropagation()}>
        <button className={`popup__close-btn popup__close-btn_${props.name}`} onClick={close}>
          <img src={closebtn} alt='close-btn' className='popup__close-btn-img' />
        </button>
        <form onSubmit={props.onSubmit} className='popup__form'>
          <h2 className='popup__title'>{props.title}</h2>
          {props.children}
          <div className='popup__btns-container'>
            <span className='popup__error popup__error_visible'>
              {props.formErrorMessage.message}
            </span>
            <button type='submit' className={`popup__submit-btn ${submitButtonClass}`} >
              {props.name === 'login' ? 'Sign in' : 'Sign up'}
            </button>
            <div className='popup__link-container'>
              <p className='popup__link-side-text'>or</p>
              <Link to={props.name === 'login' ? '/signup' : '/signin'} className='popup__link' onClick={props.SwitchFormModel}>
                {props.name === 'login' ? 'Sign up' : 'Sign in'}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
