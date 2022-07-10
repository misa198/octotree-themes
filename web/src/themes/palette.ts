import { PaletteOptions } from '@mui/material';

export const lightPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#2f5bea',
    dark: '#01081f',
    contrastText: '#fff',
  },
  background: {
    default: '#01081f',
    paper: '#151c32',
  },
  text: {
    primary: '#fff',
    secondary: '#999999',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#0c1d57',
    dark: '#01081f',
    contrastText: '#fff',
  },
  background: {
    default: '#fff',
    paper: '#f6f6f6',
  },
  text: {
    primary: '#000',
  },
};
