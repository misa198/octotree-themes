import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { PublicLayoutWrapper } from './PublicLayout.style';
import Language from './Language';

const PublicRoute: FC = () => {
  return (
    <PublicLayoutWrapper>
      <Navbar />
      <Language />
      <Outlet />
    </PublicLayoutWrapper>
  );
};

export default PublicRoute;
