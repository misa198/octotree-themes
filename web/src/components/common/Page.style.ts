import { Box, styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

export const PageWrapper = styled(Box)(() =>
  sx({
    width: '100vw',
    minHeight: '100vh',
  })
);
