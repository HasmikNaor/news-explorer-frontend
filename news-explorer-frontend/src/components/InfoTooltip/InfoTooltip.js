import { useNavigate, Link } from 'react-router-dom';
import closebtn from '../../images/close.svg';
import './InfoTooltip.css';

function InfoTooltip(props) {
  const isOpen = props.feedbackPopupOpenClass;
  const navigate = useNavigate();

  const handleLinkClick = () => {
    props.onClose();
    props.setIsSignInPopupOpen(true);
    props.setPopupOpenClass('popup_open');
    props.setFeedbackPopupOpenClass('');
    navigate('/signin');
  };

  const close = () => {
    props.onClose();
    navigate('/');
  };

  const handleClickOnOverlayClose = () => {
    close();
    props.setFeedbackPopupOpenClass('');
    navigate('/');
  };

  return (
    <div className={` info-popup  ${isOpen}`} onClick={handleClickOnOverlayClose} tabIndex="0">
      <div className="info-popup__content" onClick={(e) => e.stopPropagation()}>
        <h2 className='info-popup_title'>Registration successfully completed!</h2>
        <button className='info-popup__close-btn' onClick={close}>
          <img src={closebtn} alt="close-btn" className="info-popup__close-btn-img" />
        </button>
        <Link className="info-popup__link" to='/signin' onClick={handleLinkClick}>
          Sign in
        </Link>
      </div>
    </div>
  );
}

export default InfoTooltip;
