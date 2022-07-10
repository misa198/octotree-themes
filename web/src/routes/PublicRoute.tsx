import Fallback from 'components/common/Fallback';
import { ComponentType, FC, lazy, Suspense } from 'react';

interface Props {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  component: () => Promise<{ default: ComponentType<any> }>;
}

const PublicRoute: FC<Props> = ({ component }) => {
  const Component = lazy(component);

  return (
    <Suspense fallback={<Fallback />}>
      <Component />
    </Suspense>
  );
};

export default PublicRoute;
