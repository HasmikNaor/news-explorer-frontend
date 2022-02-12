import { Link } from 'react-router-dom';
import github from '../../images/cat.png';
import facebook from '../../images/facebook.png';
import './Footer.css';

function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>&copy; Supersite, Powered by News API</p>
      <div className='footer__list-container'>
        <ul className='footer__list footer__list_type_links'>
          <li className='footer__list-item'>
            <Link to='/' className='footer__link' target='_blank'>Home</Link>
          </li>
          <li className='footer__list-item'>
            <a
              to='/'
              href="https://practicum.yandex.com/profile/web-practicum100/" target="_blank" className='footer__link'>
              Practicum by Yandex
            </a>
          </li>
        </ul>
        <ul className='footer__list footer__list_type_sotial'>
          <li className='footer__list-item footer__list-item_type_sotial'>
            <a href='https://github.com/' target='_blank'>
              <img src={github} alt='github' className='footer__sotial' />
            </a>
          </li>
          <li className='footer__list-item footer__list-item_type_sotial'>
            <a href='https://facebook.com/' target='_blank'>
              <img src={facebook} alt='facebook' className='footer__sotial' />
            </a>
          </li>
        </ul>
      </div>
    </footer>
  );
}

export default Footer;
