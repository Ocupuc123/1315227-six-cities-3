import { render, screen } from '@testing-library/react';
import { AppRoute } from '../../../const';
import Logo from './logo';
import { withHistory } from '../../../utils/mock-component';

const renderLogo = (route: string = AppRoute.Main) =>
  render(withHistory(<Logo />, [route]));

describe('Component: Logo', () => {
  it('should render logo image with correct attributes', () => {
    renderLogo();

    const logo = screen.getByAltText('6 cities logo');
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute('src', 'img/logo.svg');
    expect(logo).toHaveAttribute('width', '81');
    expect(logo).toHaveAttribute('height', '41');
    expect(logo).toHaveClass('header__logo');
  });

  it('should link to the main page', () => {
    renderLogo();

    expect(screen.getByRole('link')).toHaveAttribute('href', AppRoute.Main);
  });

  it('should add active class when main page is active', () => {
    renderLogo(AppRoute.Main);

    expect(screen.getByRole('link')).toHaveClass('header__logo-link--active');
  });

  it('should not add active class when another page is active', () => {
    renderLogo(AppRoute.Favorites);

    expect(screen.getByRole('link')).not.toHaveClass(
      'header__logo-link--active',
    );
  });
});
