import type { UserProcess } from '../../types/state';
import { AuthorizationStatus } from '../../const';
import { userProcess } from './user-process';
import { checkAuthAction, loginAction, logoutAction } from '../api-actions';
import { makeFakeUserData, makeFakeAuthData } from '../../utils/mocks';

describe('UserProcess Slice', () => {
  const mockUserData = makeFakeUserData();

  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: null,
    };

    const result = userProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    };

    const result = userProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth", save user data with "checkAuthAction.fulfilled" action', () => {
    const initialState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Unknown,
      userData: null,
    };

    const expectedState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData,
    };

    const result = userProcess.reducer(
      initialState,
      checkAuthAction.fulfilled(mockUserData, '', undefined),
    );

    expect(result).toEqual(expectedState);
  });

  it('should set "NoAuth", reset user data with "checkAuthAction.rejected" action', () => {
    const initialState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData,
    };

    const expectedState: UserProcess = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    };

    const result = userProcess.reducer(initialState, checkAuthAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('should set "Auth", save user data with "loginAction.fulfilled" action', () => {
    const mockAuthData = makeFakeAuthData();

    const initialState: UserProcess = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    };

    const expectedState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData,
    };

    const result = userProcess.reducer(
      initialState,
      loginAction.fulfilled(mockUserData, '', mockAuthData),
    );

    expect(result).toEqual(expectedState);
  });

  it('shuld set "NoAuth", reset user data with "loginAction.rejected" action', () => {
    const initialState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData,
    };

    const expectedState: UserProcess = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    };

    const result = userProcess.reducer(initialState, loginAction.rejected);

    expect(result).toEqual(expectedState);
  });

  it('shoul set "NoAuth", reset user data with "logoutAction.fulfilled" action', () => {
    const initialState: UserProcess = {
      authorizationStatus: AuthorizationStatus.Auth,
      userData: mockUserData,
    };

    const expectedState: UserProcess = {
      authorizationStatus: AuthorizationStatus.NoAuth,
      userData: null,
    };

    const result = userProcess.reducer(initialState, logoutAction.fulfilled);

    expect(result).toEqual(expectedState);
  });
});
