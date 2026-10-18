import { NameSpace, DEFAULT_CITY, DEFAULT_SORT_TYPE } from '../../const';
import { getActiveCity, getSortType } from './selectors';

describe('AppProcess selectors', () => {
  const state = {
    [NameSpace.App]: {
      activeCity: DEFAULT_CITY,
      sortType: DEFAULT_SORT_TYPE,
    },
  };

  it('should return active city from state', () => {
    const { activeCity } = state[NameSpace.App];
    const result = getActiveCity(state);
    expect(result).toBe(activeCity);
  });

  it('should return sort type from state', () => {
    const { sortType } = state[NameSpace.App];
    const result = getSortType(state);
    expect(result).toBe(sortType);
  });
});
