import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { NameSpace, SortType, type CityName } from '../../const';
import type { AppProcess } from '../../types/state';

const DEFAULT_CITY = 'Paris';
const DEFAULT_SORT_TYPE = SortType.Popular;

const initialState: AppProcess = {
  activeCity: DEFAULT_CITY,
  sortType: DEFAULT_SORT_TYPE,
};

export const appProcess = createSlice({
  name: NameSpace.App,
  initialState,
  reducers: {
    changeCity: (state, action: PayloadAction<CityName>) => {
      state.activeCity = action.payload;
      state.sortType = DEFAULT_SORT_TYPE;
    },
    changeSortType: (state, action: PayloadAction<SortType>) => {
      state.sortType = action.payload;
    },
  },
});

export const { changeCity, changeSortType } = appProcess.actions;
