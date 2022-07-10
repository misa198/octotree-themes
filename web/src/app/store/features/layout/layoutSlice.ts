import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode } from 'modals/ThemeMode';
import { getThemeMode, saveThemeMode } from 'utils/theme';

interface State {
  themeMode: ThemeMode;
  isOpenDrawer: boolean;
}

const initialState: State = {
  themeMode: getThemeMode(),
  isOpenDrawer: false,
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
      saveThemeMode(action.payload);
    },
    toggleDrawer: (state) => {
      state.isOpenDrawer = !state.isOpenDrawer;
    },
  },
});

export default layoutSlice.reducer;
export const { setThemeMode, toggleDrawer } = layoutSlice.actions;
