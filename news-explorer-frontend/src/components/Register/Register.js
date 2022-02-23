import React, { useEffect, useState } from 'react';
import { register } from '../../utils/auth';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function Register(props) {
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
  const [nameInputfield, setNameInputField] = useState({
    field: '',
    value: '',
    error: '',
    isValid: false,
  });

  const [formErrorMessage, setFormErrorMessage] = useState({
    message: '',
  });
  const [isFormValid, setIsFormValid] = useState(false);

  useEffect(() => {
    setIsFormValid(emailInputfield.isValid && passwordInputfield.isValid && nameInputfield.isValid);
  }, [emailInputfield.isValid, passwordInputfield.isValid, nameInputfield.isValid]);

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
    setFormErrorMessage({
      message: '',
    });
    handleValidation(field, value);
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const email = emailInputfield.value;
    const password = passwordInputfield.value;
    const username = nameInputfield.value;

    if (!email || !password || !username) {
      return;
    }

    register(email, password, username)
      .then(() => {
        props.setFeedbackPopupOpenClass('info-popup_open');
        props.setIsInfoTooltipOpen(true);
        props.setIsRegisterPopupOpen(false);
      })
      .catch((err) => {
        setFormErrorMessage({
          message: 'This email already have used.choose another one',
        });
        console.log(err);
      });
  };

  const SwitchFormModel = () => {
    props.setIsRegisterPopupOpen(false);
    props.setIsSignInPopupOpen(true);
  };

  return (
    <PopupWithForm name='regisater' title='Sign up' {...props} isOpen={props.isOpen} onClose={props.onClosePopup} SwitchFormModel={SwitchFormModel} onSubmit={handleFormSubmit} isFormValid={isFormValid} formErrorMessage={formErrorMessage} >
      {/* <form onSubmit={handleFormSubmit} className='popup__form'>
        <h2 className='popup__title'>Sign up</h2> */}
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
      {/* <div className='popup__btns-container'>
        <span className='popup__error popup__error_visible'>
          {formErrorMessage.message}
        </span>
        <button type='submit' className={`popup__submit-btn ${SubmitButtonClass}`} >
          Sign up
        </button>
        <div className='popup__link-container'>
          <p className='popup__link-side-text'>or</p>
          <Link to='/signin' className='popup__link' onClick={SwitchFormModel}>
            Sign in
          </Link>
        </div>
      </div> */}
      {/* </form> */}
    </PopupWithForm >
  );
}

export default Register;
