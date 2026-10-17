import { AuthorizationStatus, NameSpace } from '../../const';
import { UserProcess } from '../../types/state';
import {
  getAuthorizationStatus,
  getAuthCheckedStatus,
  getUserInfo,
} from './selectors';
import { makeFakeUserData } from '../../utils/mocks';

describe('UserProcess selectors', () => {
  it('should return authorization status from state', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state: UserProcess = {
      authorizationStatus,
      userData: null,
    };

    const result = getAuthorizationStatus({
      [NameSpace.User]: state,
    });

    expect(result).toBe(authorizationStatus);
  });

  it('should return "true" because auth status is "Auth"', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const state: UserProcess = {
      authorizationStatus,
      userData: null,
    };

    const result = getAuthCheckedStatus({ [NameSpace.User]: state });

    expect(result).toBe(true);
  });

  it('should return "false" because auth status is "Unknown"', () => {
    const authorizationStatus = AuthorizationStatus.Unknown;
    const state: UserProcess = {
      authorizationStatus,
      userData: null,
    };

    const result = getAuthCheckedStatus({ [NameSpace.User]: state });

    expect(result).toBe(false);
  });

  it('should return user data from state', () => {
    const authorizationStatus = AuthorizationStatus.Auth;
    const mockUserData = makeFakeUserData();

    const state: UserProcess = {
      authorizationStatus,
      userData: mockUserData,
    };

    const { userData } = state;

    const result = getUserInfo({ [NameSpace.User]: state });

    expect(result).toEqual(userData);
  });
});
