import { useRoutes } from 'react-router-dom';
import PopupWithForm from '../PopupWithForm/PopupWithForm';

function PopupWithFormRoutes(props) {
  const popupWithForm = useRoutes([
    {
      path: '/signup',
      element: <PopupWithForm {...props} />,
    },
    {
      path: '/signin',
      element: <PopupWithForm {...props} />,
    },
  ]);

  return popupWithForm;
}

export default PopupWithFormRoutes;
