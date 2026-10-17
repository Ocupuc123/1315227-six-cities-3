import { appProcess, changeCity, changeSortType } from './app-process';
import type { AppProcess } from '../../types/state';
import { DEFAULT_SORT_TYPE, DEFAULT_CITY, SortType } from '../../const';

describe('AppProcess Slice', () => {
  it('should return initial state with empty action', () => {
    const emptyAction = { type: '' };
    const expectedState: AppProcess = {
      activeCity: DEFAULT_CITY,
      sortType: DEFAULT_SORT_TYPE,
    };

    const result = appProcess.reducer(expectedState, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should return default initial state with empty action and undefined state', () => {
    const emptyAction = { type: '' };
    const expectedState = {
      activeCity: DEFAULT_CITY,
      sortType: DEFAULT_SORT_TYPE,
    };

    const result = appProcess.reducer(undefined, emptyAction);

    expect(result).toEqual(expectedState);
  });

  it('should change city with "changeCity" action', () => {
    const expectedCity = 'Cologne';
    const initialState: AppProcess = {
      activeCity: DEFAULT_CITY,
      sortType: DEFAULT_SORT_TYPE,
    };

    const expectedState = {
      activeCity: expectedCity,
      sortType: DEFAULT_SORT_TYPE,
    };

    const result = appProcess.reducer(initialState, changeCity(expectedCity));

    expect(result).toEqual(expectedState);
  });

  it('should change sort type with "changeSortType" action', () => {
    const expectedSortType = SortType.PriceHighToLow;
    const initialState: AppProcess = {
      activeCity: DEFAULT_CITY,
      sortType: DEFAULT_SORT_TYPE,
    };
    const expectedState = {
      activeCity: DEFAULT_CITY,
      sortType: expectedSortType,
    };

    const result = appProcess.reducer(
      initialState,
      changeSortType(expectedSortType),
    );

    expect(result).toEqual(expectedState);
  });
});
