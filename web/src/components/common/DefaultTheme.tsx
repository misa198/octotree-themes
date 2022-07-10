import { CssBaseline } from '@mui/material';
import { ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from 'app/hooks/redux';
import { FC, PropsWithChildren, useMemo } from 'react';
import createTheme from 'themes';

const DefaultTheme: FC<PropsWithChildren> = ({ children }) => {
  const themeMode = useAppSelector((state) => state.layout.themeMode);

  const theme = useMemo(() => {
    return createTheme(themeMode);
  }, [themeMode]);

  return (
    <>
      <CssBaseline />
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </>
  );
};

export default DefaultTheme;
