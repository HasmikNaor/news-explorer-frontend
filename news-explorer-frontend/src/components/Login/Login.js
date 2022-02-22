import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authorize } from '../../utils/auth';
import PopupWithForm from '../PopupWithForm/PopupWithForm';
import '../PopupWithForm/PopupWithForm.css';

function Login(props) {
  const navigate = useNavigate();
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
  });
  const [isFormValid, setIsFormValid] = useState(emailInputfield.isValid && passwordInputfield.isValid);

  useEffect(() => {
    setIsFormValid(emailInputfield.isValid && passwordInputfield.isValid);
  }, [emailInputfield, passwordInputfield]);

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

    if (field === 'password') {
      handlePasswordValidation(field, value);
    }
  };

  const handleChange = (e) => {
    const field = e.target.name;
    const value = e.target.value;
    setFormErrorMessage({
      message: '',
    });
    handleValidation(field, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = emailInputfield.value;
    const password = passwordInputfield.value;

    if (!email || !password) {
      return;
    }

    authorize(email, password)
      .then((data) => {
        if (data.token) {
          localStorage.setItem('token', data.token);
          props.setToken(data.token);
          props.handleLoggedIn(); // updates the state inside App.js
          props.onClosePopup();
          navigate('/saved-news');
        }
      })
      .catch((err) => {
        setFormErrorMessage({
          message: 'This email is not availatble',
        });
        console.log(err);
      });

    props.styleNavbar();
  };

  const SwitchFormModel = () => {
    props.setIsSignInPopupOpen(false);
    props.setIsRegisterPopupOpen(true);
  };

  return (
    <PopupWithForm
      name='login'
      title='Sign in'
      {...props}
      isOpen={props.isOpen}
      onClose={props.onClosePopup}
      onSubmit={handleFormSubmit}
      SwitchFormModel={SwitchFormModel}
      isFormValid={isFormValid}
      formErrorMessage={formErrorMessage}
    >
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
    </PopupWithForm >
  );
}

export default Login;
