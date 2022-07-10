import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ThemeMode } from 'modals/ThemeMode';
import { getThemeMode, saveThemeMode } from 'utils/theme';

interface State {
  themeMode: ThemeMode;
}

const initialState: State = {
  themeMode: getThemeMode(),
};

export const layoutSlice = createSlice({
  name: 'layout',
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<ThemeMode>) => {
      state.themeMode = action.payload;
      saveThemeMode(action.payload);
    },
  },
});

export default layoutSlice.reducer;
export const { setThemeMode } = layoutSlice.actions;
