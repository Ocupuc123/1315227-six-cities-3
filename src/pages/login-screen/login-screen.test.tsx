import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { AppRoute, type CityName } from '../../const';
import LoginScreen from './login-screen';
import { withHistory, withStore } from '../../utils/mock-component';
import { changeCity } from '../../store/app-process/app-process';

const renderLoginScreen = () => {
  const { withStoreComponent, mockStore } = withStore(<LoginScreen />, {});
  const preparedComponent = withHistory(withStoreComponent);

  return {
    ...render(preparedComponent),
    mockStore,
  };
};

describe('Component: LoginScreen', () => {
  it('should render correctly', () => {
    const signInText = 'Sign in';
    const emailText = 'Email';
    const passwordText = 'Password';
    const { withStoreComponent } = withStore(<LoginScreen />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);

    expect(screen.getAllByText(signInText)).toHaveLength(2);
    expect(screen.getByPlaceholderText(emailText)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(passwordText)).toBeInTheDocument();
  });

  it('should render correctly when user enter email and password', async () => {
    const emailElementPlaceholder = 'Email';
    const passwordElementPlaceholder = 'Password';
    const expectedEmailValue = 'keks@test.com';
    const expectedPasswordValue = '123456a';
    const { withStoreComponent } = withStore(<LoginScreen />, {});
    const preparedComponent = withHistory(withStoreComponent);

    render(preparedComponent);
    await userEvent.type(
      screen.getByPlaceholderText(emailElementPlaceholder),
      expectedEmailValue,
    );
    await userEvent.type(
      screen.getByPlaceholderText(passwordElementPlaceholder),
      expectedPasswordValue,
    );

    expect(screen.getByDisplayValue(expectedEmailValue)).toBeInTheDocument();
    expect(screen.getByDisplayValue(expectedPasswordValue)).toBeInTheDocument();
  });

  it('should render random city from the cities list', () => {
    renderLoginScreen();

    const cityLink = screen.getByRole('link');
    expect(cityLink.textContent).toMatch(
      /Paris|Cologne|Brussels|Amsterdam|Hamburg|Dusseldorf/,
    );
  });

  it('should link random city to the main page', () => {
    renderLoginScreen();

    expect(screen.getByRole('link')).toHaveAttribute('href', AppRoute.Main);
  });

  it('should dispatch changeCity with random city on click', async () => {
    const user = userEvent.setup();
    const { mockStore } = renderLoginScreen();

    const cityLink = screen.getByRole('link');
    await user.click(cityLink);

    const cityName = (cityLink.textContent ?? '') as CityName;
    expect(mockStore.getActions()).toEqual([changeCity(cityName)]);
  });
});
