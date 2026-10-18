import { NameSpace, type CityName, type SortType } from '../../const';
import { State } from '../../types/state';

export const getActiveCity = (state: Pick<State, NameSpace.App>): CityName =>
  state[NameSpace.App].activeCity;

export const getSortType = (state: Pick<State, NameSpace.App>): SortType =>
  state[NameSpace.App].sortType;
