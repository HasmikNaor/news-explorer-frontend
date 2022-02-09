import cat from '../../images/cat.png';
import facebook from '../../images/facebook.png';
import './Footer.css'
function Footer() {
  return (
    <footer className='footer'>
      <p className='footer__copyright'>&copy; Supersite, Powered by News API</p>
      <div className='footer__list-container'>
        <ul className='footer__list footer__list_links'>
          <li className='footer__list-item'>Home</li>
          <li className='footer__list-item'>Practicum by Yandex</li>
        </ul>
        <ul className='footer__list footer__list_sotial'>
          <li className='footer__list_sotial-item'>
            <img src={cat} alt='cat' className='footer__sotial' />
          </li>
          <li className='footer__list_sotial-item'><img src={facebook} alt='cat' className='footer__sotial' /></li>
        </ul>
      </div>
    </footer>
  )
}

export default Footer;