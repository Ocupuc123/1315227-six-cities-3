import { Outlet, useLocation, matchPath } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import Header from './components/header/header';
import { AppRoute } from '../const';
import ScrollToTop from './components/scroll-to-top/scroll-to-top';

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

function Layout(): JSX.Element {
  const favorites = useAppSelector((state) => state.favorites);
  const isFavoriteEmpty = favorites.length === 0;
  const { pathname } = useLocation();

  return (
    <div
      className={`page ${getPageModifiers(pathname as AppRoute, isFavoriteEmpty)}`}
    >
      <Header favoriteCount={favorites.length} />
      <Outlet />
      <ScrollToTop />
    </div>
  );
}

export default Layout;
