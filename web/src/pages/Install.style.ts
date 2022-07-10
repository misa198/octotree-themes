import { Box, Typography, styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

export const InstallWrapper = styled(Box)(() =>
  sx({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: 10,
  })
);

export const InstallTitle = styled(Typography)(() =>
  sx({
    fontWeight: 'bold',
    fontSize: {
      xs: '1.5rem',
      md: '2.5rem',
    },
  })
);

export const InstallDescription = styled(Typography)(({ theme }) =>
  sx({
    textAlign: 'center',
    color: theme.palette.text.secondary,
    fontSize: {
      xs: '0.9rem',
      md: '1rem',
    },
  })
);

export const InstallPlatforms = styled(Box)(() =>
  sx({
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    mt: 3,
  })
);
