import { Fade } from '@mui/material';
import { FC, PropsWithChildren, useMemo } from 'react';
import { PageWrapper } from './Page.style';
import { useLocation } from 'react-router-dom';
import { matchPath } from 'react-router';

const excludedPaddingRoutes = ['/'];

const Page: FC<PropsWithChildren> = ({ children }) => {
  const location = useLocation();
  const excludedPadding = useMemo(() => {
    let res = false;
    excludedPaddingRoutes.forEach((route) => {
      if (matchPath(location.pathname, route)) {
        res = true;
      }
    });
    return res;
  }, [location.pathname]);

  return (
    <Fade in={true} unmountOnExit>
      <PageWrapper
        sx={{
          pt: excludedPadding ? 0 : '80px',
        }}
      >
        {children}
      </PageWrapper>
    </Fade>
  );
};

export default Page;
