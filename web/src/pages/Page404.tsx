// Demo component

import { Typography } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import { FC } from 'react';

const Page404: FC = () => (
  <>
    <HelmetMeta title="404" />
    <Typography variant="h4" sx={{ mt: 4 }}>
      404
    </Typography>
  </>
);

export default Page404;
