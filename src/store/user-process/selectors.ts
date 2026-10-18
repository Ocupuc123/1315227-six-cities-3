import { NameSpace } from '../../const';
import type { State } from '../../types/state';
import type { UserData } from '../../types/user-data';
import { AuthorizationStatus } from '../../const';

export const getAuthorizationStatus = (state: Pick<State, NameSpace.User>): AuthorizationStatus =>
  state[NameSpace.User].authorizationStatus;

export const getAuthCheckedStatus = (state: Pick<State, NameSpace.User>): boolean =>
  state[NameSpace.User].authorizationStatus !== AuthorizationStatus.Unknown;

export const getUserInfo = (state: Pick<State, NameSpace.User>): UserData | null => state[NameSpace.User].userData;
