import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { withHistory, withStore } from '../../utils/mock-component';
import LoginScreen from './login-screen';

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
});
