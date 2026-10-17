import { Outlet, useLocation, matchPath } from 'react-router-dom';
import { useAppSelector } from '../hooks';
import Header from './components/header/header';
import { AppRoute } from '../const';
import { getFavoritesCount, getIsFavoritesEmpty } from '../store/selectors';
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
  const { pathname } = useLocation();
  const favoriteCount = useAppSelector(getFavoritesCount);
  const isFavoriteEmpty = useAppSelector(getIsFavoritesEmpty);

  return (
    <div
      className={`page ${getPageModifiers(pathname as AppRoute, isFavoriteEmpty)}`}
    >
      <Header favoriteCount={favoriteCount} />
      <Outlet />
      <ScrollToTop />
    </div>
  );
}

export default Layout;
