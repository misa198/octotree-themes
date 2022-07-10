import { createTheme } from '@mui/material/styles';
import { ThemeMode } from 'modals/ThemeMode';
import { components } from './components';
import { darkPalette, lightPalette } from './palette';
import { typography } from './typography';

const theme = (mode: ThemeMode) =>
  createTheme({
    palette: mode === ThemeMode.Light ? darkPalette : lightPalette,
    components,
    typography,
    shape: {
      borderRadius: 10,
    },
  });

export default theme;
