import { NameSpace, type CityName, type SortType } from '../../const';
import { State } from '../../types/state';

export const getActiveCity = (state: State): CityName =>
  state[NameSpace.App].activeCity;

export const getSortType = (state: State): SortType =>
  state[NameSpace.App].sortType;
