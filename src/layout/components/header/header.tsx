import { MouseEvent } from 'react';
import { Link, useLocation, matchPath } from 'react-router-dom';
import Logo from '../logo/logo';
import { AppRoute, AuthorizationStatus } from '../../../const';
import { useAppSelector, useAppDispatch } from '../../../hooks';
import { logoutAction } from '../../../store/api-actions';

type HeaderProps = {
  favoriteCount: number;
};

function Header({ favoriteCount }: HeaderProps): JSX.Element {
  const { pathname } = useLocation();
  const isLoginPage = matchPath(AppRoute.Login, pathname);
  const userData = useAppSelector((state) => state.userData);
  const authorizationStatus = useAppSelector(
    (state) => state.authorizationStatus,
  );

  const dispatch = useAppDispatch();

  const handleSignoutClick = (evt: MouseEvent<HTMLAnchorElement>) => {
    evt.preventDefault();
    dispatch(logoutAction());
  };

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
                      authorizationStatus === AuthorizationStatus.Auth
                        ? AppRoute.Favorites
                        : AppRoute.Login
                    }
                  >
                    <div className="header__avatar-wrapper user__avatar-wrapper">
                      {userData !== null && (
                        <img
                          className="header__avatar user__avatar"
                          src={userData.avatarUrl}
                          width={20}
                          height={20}
                          alt={userData.name}
                        />
                      )}
                    </div>
                    {authorizationStatus === AuthorizationStatus.Auth ? (
                      <>
                        <span className="header__user-name user__name">
                          {userData?.email}
                        </span>
                        <span className="header__favorite-count">
                          {favoriteCount}
                        </span>
                      </>
                    ) : (
                      <span className="header__login">Sign in</span>
                    )}
                  </Link>
                </li>
                {authorizationStatus === AuthorizationStatus.Auth && (
                  <li className="header__nav-item">
                    <Link
                      className="header__nav-link"
                      to={AppRoute.Main}
                      onClick={handleSignoutClick}
                    >
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
