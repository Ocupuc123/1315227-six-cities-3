import { Link, useLocation, matchPath } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute, AuthorizationStatus } from '../../const';
import { getAuthorizationStatus } from '../../authorizationStatus';

function Header(): JSX.Element {
  const { pathname } = useLocation();
  const isLoginPage = matchPath(AppRoute.Login, pathname);
  const authrozationStatus = getAuthorizationStatus();

  return (
    <header className="header">
      <div className="container">
        <div className="header__wrapper">
          <div className="header__left">
            <Logo />
          </div>
          {!isLoginPage && (
            <nav className="header__nav">
              <ul className="header__nav-list">
                <li className="header__nav-item user">
                  <Link
                    className="header__nav-link header__nav-link--profile"
                    to={
                      authrozationStatus === AuthorizationStatus.Auth
                        ? AppRoute.Favorites
                        : AppRoute.Login
                    }
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper" />
                    {authrozationStatus === AuthorizationStatus.Auth ? (
                      <>
                        <span className="header__user-name user__name">
                          Oliver.conner@gmail.com
                        </span>
                        <span className="header__favorite-count">3</span>
                      </>
                    ) : (
                      <span className="header__login">Sign in</span>
                    )}
                  </Link>
                </li>
                {authrozationStatus === AuthorizationStatus.Auth && (
                  <li className="header__nav-item">
                    <Link className="header__nav-link" to={AppRoute.Main}>
                      <span className="header__signout">Sign out</span>
                    </Link>
                  </li>
                )}
              </ul>
            </nav>
          )}
        </div>
      </div>
    </header>
  );
}

export default Header;
