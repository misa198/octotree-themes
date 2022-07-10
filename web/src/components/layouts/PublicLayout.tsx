import { FC } from 'react';
import { Outlet } from 'react-router-dom';

const PublicRoute: FC = () => {
  return (
    <>
      Public
      <Outlet />
    </>
  );
};

export default PublicRoute;
