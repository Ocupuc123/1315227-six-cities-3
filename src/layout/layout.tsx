import { Outlet, useLocation, matchPath } from 'react-router-dom';
import Header from '../components/header/header';
import { AppRoute } from '../const';

const getPageModifiers = (pathname: AppRoute) => {
  const modifiers = [];

  if (matchPath(AppRoute.Main, pathname)) {
    modifiers.push('page--gray', 'page--main');
  }

  if (matchPath(AppRoute.Login, pathname)) {
    modifiers.push('page--gray', 'page--login');
  }

  return modifiers.join(' ');
};

function Layout(): JSX.Element {
  const { pathname } = useLocation();

  return (
    <div className={`page ${getPageModifiers(pathname as AppRoute)}`}>
      <Header />
      <Outlet />
    </div>
  );
}

export default Layout;
