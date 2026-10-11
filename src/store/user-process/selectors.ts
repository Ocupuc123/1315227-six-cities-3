import { NameSpace } from '../../const';
import type { State } from '../../types/state';
import type { UserData } from '../../types/user-data';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: State): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: State): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getUserInfo = (state: State): UserData | null => state[NameSpace.User].userData;
