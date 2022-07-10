import { FC } from 'react';
import { RouteObject, useRoutes } from 'react-router-dom';
import PublicRoute from './PublicRoute';

export const routes: RouteObject[] = [
  {
    path: '',
    element: (
      <PublicRoute
        component={() => import('components/layouts/PublicLayout')}
      />
    ),
    children: [
      {
        path: '',
        element: <PublicRoute component={() => import('pages/Home')} />,
      },
      {
        path: 'install',
        element: <PublicRoute component={() => import('pages/Install')} />,
      },
      {
        path: 'features',
        element: <PublicRoute component={() => import('pages/Features')} />,
      },
      {
        path: 'about',
        element: <PublicRoute component={() => import('pages/About')} />,
      },
      {
        path: '*',
        element: <PublicRoute component={() => import('pages/Page404')} />,
      },
    ],
  },
];

const Router: FC = () => {
  const element = useRoutes(routes);

  return <>{element}</>;
};

export default Router;
