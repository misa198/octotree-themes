import { THEME_MODE } from 'constants/keys';
import { ThemeMode } from 'modals/ThemeMode';

export const saveThemeMode = (mode: ThemeMode) =>
  localStorage.setItem(THEME_MODE, mode);

export const getThemeMode = () => {
  const theme = localStorage.getItem(THEME_MODE);
  if (theme) return theme as ThemeMode;
  saveThemeMode(ThemeMode.Dark);
  return ThemeMode.Dark;
};
