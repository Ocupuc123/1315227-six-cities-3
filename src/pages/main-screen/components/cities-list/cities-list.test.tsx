import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRoute, Cities } from '../../../../const';
import CitiesList from './cities-list';
import { withHistory } from '../../../../utils/mock-component';

describe('Component: CitiesList', () => {
  it('should render all cities', () => {
    render(
      withHistory(
        <CitiesList cities={Cities} activeCityName="Paris" onClick={vi.fn()} />,
      ),
    );

    Cities.forEach((city) => {
      expect(screen.getByText(city)).toBeInTheDocument();
    });
  });

  it('should add active class to the active city link', () => {
    render(
      withHistory(
        <CitiesList cities={Cities} activeCityName="Paris" onClick={vi.fn()} />,
      ),
    );

    expect(screen.getByText('Paris').closest('a')).toHaveClass(
      'tabs__item--active',
    );
    expect(screen.getByText('Amsterdam').closest('a')).not.toHaveClass(
      'tabs__item--active',
    );
  });

  it('should link city tabs to the main page', () => {
    render(
      withHistory(
        <CitiesList cities={['Paris', 'Amsterdam']} activeCityName="Paris" onClick={vi.fn()} />,
      ),
    );

    expect(screen.getByText('Paris').closest('a')).toHaveAttribute(
      'href',
      AppRoute.Main,
    );
  });

  it('should call onClick with city name when city is clicked', async () => {
    const user = userEvent.setup();
    const handleClick = vi.fn();

    render(
      withHistory(
        <CitiesList
          cities={['Paris', 'Amsterdam']}
          activeCityName="Paris"
          onClick={handleClick}
        />,
      ),
    );

    await user.click(screen.getByText('Amsterdam'));

    expect(handleClick).toHaveBeenCalledWith('Amsterdam');
  });
});
