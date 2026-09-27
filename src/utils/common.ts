import type { AuthInfo, UserData } from '../types/user-data';

type AuthPayload = {
  token: string;
  info: UserData;
};

export const capitalizeString = (stringName: string): string =>
  stringName.charAt(0).toUpperCase() + stringName.slice(1);

export const splitAuthInfo = (data: AuthInfo): AuthPayload => {
  const { token, ...userData } = data;
  return {
    token,
    info: userData,
  };
};
