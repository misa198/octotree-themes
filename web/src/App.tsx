import Fallback from 'components/common/Fallback';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC, Suspense } from 'react';
import Router from 'routes/Routes';

const App: FC = () => {
  return (
    <>
      <HelmetMeta />
      <Suspense fallback={<Fallback />}>
        <Router />
      </Suspense>
    </>
  );
};

export default App;
