import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import { PublicLayoutWrapper } from './PublicLayout.style';

const PublicRoute: FC = () => {
  return (
    <PublicLayoutWrapper>
      <Navbar />
      <Outlet />
    </PublicLayoutWrapper>
  );
};

export default PublicRoute;
