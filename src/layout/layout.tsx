import { Outlet, useLocation, matchPath } from 'react-router-dom';
import Header from './components/header/header';
import { AppRoute } from '../const';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

type LayoutProps = {
  isFavoriteEmpty?: boolean;
};

const getPageModifiers = (pathname: AppRoute, isFavoriteEmpty: boolean) => {
  const modifiers: string[] = [];

  if (pathname === AppRoute.Main) {
    modifiers.push('page--gray', 'page--main');
  }

  if (matchPath(AppRoute.Login, pathname)) {
    modifiers.push('page--gray', 'page--login');
  }

  if (matchPath(AppRoute.Favorites, pathname) && isFavoriteEmpty) {
    modifiers.push('page--favorites-empty');
  }

  return modifiers.join(' ');
};

function Layout({ isFavoriteEmpty = false }: LayoutProps): JSX.Element {
  const { pathname } = useLocation();

  return (
    <div
      className={`page ${getPageModifiers(pathname as AppRoute, isFavoriteEmpty)}`}
    >
      <Header />
      <Outlet />
      <ScrollToTop />
    </div>
  );
}

export default Layout;
