import { Typography } from '@mui/material';
import HelmetMeta from 'components/common/HelmetMeta';
import Page from 'components/common/Page';
import { FC } from 'react';

const Page404: FC = () => (
  <Page>
    <HelmetMeta title="404" />
    <Typography variant="h4" sx={{ mt: 4 }}>
      404
    </Typography>
  </Page>
);

export default Page404;
