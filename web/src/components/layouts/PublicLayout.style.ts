import { Box, styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

export const PublicLayoutWrapper = styled(Box)(({ theme }) =>
  sx({
    width: '100vw',
    minHeight: '100vh',
    bgcolor: theme.palette.background.default,
  })
);
