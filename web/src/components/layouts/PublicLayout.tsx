import { FC, useMemo } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Navbar from './Navbar';
import { PublicLayoutWrapper } from './PublicLayout.style';
import { matchPath } from 'react-router';

const excludedPaddingRoutes = ['/'];

const PublicRoute: FC = () => {
  const location = useLocation();
  const excludedPadding = useMemo(() => {
    let res = false;
    excludedPaddingRoutes.forEach((route) => {
      if (matchPath(location.pathname, route)) {
        res = true;
      }
    });
    return res;
  }, [excludedPaddingRoutes, location.pathname]);

  return (
    <PublicLayoutWrapper
      sx={{
        pt: excludedPadding ? 0 : '74px',
      }}
    >
      <Navbar />
      <Outlet />
    </PublicLayoutWrapper>
  );
};

export default PublicRoute;
