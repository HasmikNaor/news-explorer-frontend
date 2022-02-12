import { useRoutes } from 'react-router-dom';
import Header from '../Header/Header';

function HeaderRoutes(props) {
  const header = useRoutes([
    {
      path: '/',
      element: <Header {...props} />,
    },
    {
      path: '/signin',
      element: <Header {...props} />,
    },
    {
      path: '/signup',
      element: <Header {...props} />,
    },
  ]);

  return header;
}

export default HeaderRoutes;
