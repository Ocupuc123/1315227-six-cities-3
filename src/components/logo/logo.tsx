import { NavLink } from 'react-router-dom';
import { AppRoute } from '../../const';

function Logo(): JSX.Element {
  return (
    <NavLink
      className={({ isActive }) => `header__logo-link${isActive ? ' header__logo-link--active' : ''}`}
      to={AppRoute.Main}
    >
      <img
        className="header__logo"
        src="img/logo.svg"
        alt="6 cities logo"
        width={81}
        height={41}
      />
    </NavLink>
  );
}

export default Logo;
