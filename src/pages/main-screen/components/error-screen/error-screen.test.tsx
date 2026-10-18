import { render, screen } from '@testing-library/react';
import ErrorScreen from './error-screen';

describe('Component: ErrorScreen', () => {
  it('should render error message', () => {
    render(<ErrorScreen />);

    expect(
      screen.getByText('No places to stay available'),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        'We could not find any property available at the moment in Dusseldorf',
      ),
    ).toBeInTheDocument();
  });

  it('should render empty right section', () => {
    const { container } = render(<ErrorScreen />);

    expect(container.querySelector('.cities__right-section')).toBeInTheDocument();
    expect(container.querySelector('.cities__status-wrapper')).toHaveClass(
      'tabs__content',
    );
  });
});
