import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import closebtn from '../../images/close.svg';
import { authorize, register } from '../../utils/auth';
import './PopupWithForm.css';

function PopupWithForm(props) {
  const isSignInPopupOpen = props.isSignInPopupOpen;
  const isRegisterPopupOpen = props.isRegisterPopupOpen;
  const formIsOpen = (isSignInPopupOpen || isRegisterPopupOpen) ? 'popup_open' : '';
  const users = props.users;
  const [SubmitButtonClass, setSubmitButtonClass] = useState('popup__submit-btn_disabled');
  const [nameInputfield, setNameInputField] = useState({
    field: '',
    value: '',
    error: '',
    isValid: false,
  });
  const [emailInputfield, setEmailInputField] = useState({
    field: '',
    value: '',
    error: '',
    isValid: false,
  });
  const [passwordInputfield, setPasswordInputField] = useState({
    field: '',
    value: '',
    error: '',
    isValid: false,
  });
  const [formErrorMessage, setFormErrorMessage] = useState({
    message: '',
    formName: '',
  });

  const signinFormValid = emailInputfield.isValid && passwordInputfield.isValid;
  const signupFormValid = emailInputfield.isValid && passwordInputfield.isValid && nameInputfield.isValid;

  const [formIsValid, setFormIsValid] = useState(false);
  const navigate = useNavigate();

  const toggleBtnState = () => {
    if (formIsValid) {
      setSubmitButtonClass('');
    }
    if (!formIsValid) {
      setSubmitButtonClass('popup__submit-btn_disabled');
    }
  };

  useEffect(() => {
    setFormIsValid(isSignInPopupOpen ? signinFormValid : signupFormValid);
  }, [signinFormValid, signupFormValid]);

  useEffect(() => {
    toggleBtnState();
  }, [formIsValid]);

  const close = () => {
    props.onClosePopup();
    navigate('/');
  };

  const handleClickOnOverlayClose = () => {
    close();
  };

  const handleSigninSubmit = (email, password) => {
    if (!email || !password) {
      return;
    }

    authorize(email, password)
      .then((data) => {
        console.log(data);
        if (data.token) {
          localStorage.setItem('token', data.token);
          props.setToken(data.token);
          props.handleLoggedIn(); // updates the state inside App.js
          // props.setCurrentUser({ name })
          props.onClosePopup();
          navigate('/saved-news');
        }
      })
      .catch((err) => {
        setFormErrorMessage({
          message: 'This email is not availatble',
          formName: 'sign in',
        });
        console.log(err);
      });

    props.navStyleHandler();
  };

  const handleSignUpSubmit = (email, password, username) => {
    if (!email || !password || !username) {
      return;
    }

    const newUser = {
      name: nameInputfield.value,
      password: passwordInputfield.value,
      email: emailInputfield.value,
    };

    register(email, password, username)
      .then((data) => {
        console.log(data);
        props.setFeedbackPopupOpenClass('info-popup_open');
        props.setIsInfoTooltipOpen(true);
        props.onClosePopup();
        // props.setIsSuccessOpen(true);
      })
      .catch((err) => {
        setFormErrorMessage({
          message: 'This email already have used.choose another one',
          formName: 'sign up',
        });
        console.log(err);
      });

    users.push(newUser);
    // props.setUsersCollection(users);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = emailInputfield.value;
    const password = passwordInputfield.value;
    const username = nameInputfield.value;

    if (isSignInPopupOpen) {
      handleSigninSubmit(email, password);
    }

    if (isRegisterPopupOpen) {
      handleSignUpSubmit(email, password, username);
    }
  };

  const switchModelHandler = () => {
    setSubmitButtonClass('popup__submit-btn_disabled');
    setFormIsValid(false);
    props.setIsSignInPopupOpen((prevState) => !prevState);
    props.setIsRegisterPopupOpen((prevState) => !prevState);
    setEmailInputField({
      value: '',
    });
    setNameInputField({
      value: '',
    });
    setPasswordInputField({
      value: '',
    });
  };

  const handleEmailValidation = (field, value) => {
    if (!value.match(/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/)) {
      setEmailInputField({
        field,
        value,
        error: 'not valid email',
        isValid: false,
      });
    }
    else {
      setEmailInputField({
        field,
        value,
        error: '',
        isValid: true,
      });
    }
  };

  const handleNameValidation = (field, value) => {
    if (!value.match(/^[a-zA-Z]+$/)) {
      setNameInputField({
        field,
        value,
        error: 'not valid name',
        isValid: false,
      });
    }
    else {
      setNameInputField({
        field,
        value,
        error: '',
        isValid: true,
      });
    }
  };

  const handlePasswordValidation = (field, value) => {
    if (value.length < 2) {
      setPasswordInputField({
        field,
        value,
        error: 'minimum 2 length needed',
        isValid: false,
      });
    }
    else {
      setPasswordInputField({
        field,
        value,
        error: '',
        isValid: true,
      });
    }
  };

  const handleValidation = (field, value) => {
    if (field === 'email') {
      handleEmailValidation(field, value);
    }
    if (field === 'name') {
      handleNameValidation(field, value);
    }
    if (field === 'password') {
      handlePasswordValidation(field, value);
    }
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setFormErrorMessage('');
    handleValidation(field, value);
  };

  return (
    <div className={`popup ${formIsOpen}`} onClick={handleClickOnOverlayClose} tabIndex='0'>
      <div className='popup__content' onClick={(e) => e.stopPropagation()}>

        <button className={`popup__close-btn popup__close-btn_${props.name}`} onClick={close}>
          <img src={closebtn} alt='close-btn' className='popup__close-btn-img' />
        </button>

        <form onSubmit={handleFormSubmit} className='popup__form'>
          <h2 className='popup__title'>
            {isSignInPopupOpen ? 'Sign in' : 'Sign up'}
          </h2>
          <label htmlFor='email' className='popup__label'>email</label>
          <input
            id='email'
            required
            name='email'
            type='email'
            placeholder='Enter Email'
            className='popup__input'
            value={emailInputfield.value || ''}
            onChange={handleChange}
          />
          <span className='popup__error popup__error_visible'>{emailInputfield.error}</span>
          <label htmlFor='password' className='popup__label'>password</label>
          <input
            id='password'
            required
            name='password'
            type='password'
            placeholder='Enter password'
            className='popup__input'
            minLength='2'
            value={passwordInputfield.value || ''}
            onChange={handleChange}
          />
          <span className='popup__error popup__error_visible'>{passwordInputfield.error}</span>
          {isRegisterPopupOpen &&
            <>
              <label htmlFor='name' className='popup__label'>name</label>
              <input
                id='name'
                required
                name='name'
                type='text'
                placeholder='Enter your username'
                className='popup__input'
                minLength='2'
                value={nameInputfield.value || ''}
                onChange={handleChange}
              />
              <span className='popup__error_visible'>{nameInputfield.error}</span>
            </>}
          <div className='popup__btns-container'>
            {!isSignInPopupOpen && <span className='popup__error popup__error_visible'>
              {formErrorMessage.formName === 'sign up' && formErrorMessage.message}
            </span>}
            {isSignInPopupOpen && <span className='popup__error popup__error_visible'>
              {formErrorMessage.formName === 'sign in' && formErrorMessage.message}
            </span>}
            <button type='submit' className={`popup__submit-btn ${SubmitButtonClass}`} >
              {isSignInPopupOpen ? 'Sign in' : 'Sign up'}
            </button>
            <div className='popup__link-container'>
              <p className='popup__link-side-text'>or</p>
              <Link to={isSignInPopupOpen ? '/signup' : '/signin'} className='popup__link' onClick={switchModelHandler}>
                {isSignInPopupOpen ? 'Sign up' : 'Sign in'}
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
