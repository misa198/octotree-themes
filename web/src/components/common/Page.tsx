import { Fade } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { PageWrapper } from './Page.style';

const Page: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Fade in={true} unmountOnExit>
      <PageWrapper>{children}</PageWrapper>
    </Fade>
  );
};

export default Page;
