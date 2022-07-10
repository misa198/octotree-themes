import { PaletteOptions } from '@mui/material';

export const lightPalette: PaletteOptions = {
  mode: 'dark',
  primary: {
    main: '#2f5bea',
    dark: '#01081f',
    contrastText: '#fff',
  },
  background: {
    default: '#151c32',
    paper: '#fff',
  },
  text: {
    primary: '#fff',
  },
};

export const darkPalette: PaletteOptions = {
  mode: 'light',
  primary: {
    main: '#2f5bea',
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
