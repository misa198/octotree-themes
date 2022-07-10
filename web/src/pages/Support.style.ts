import { Box, styled, Typography } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

export const SupportWrapper = styled(Box)(() =>
  sx({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: 10,
  })
);

export const SupportTitle = styled(Typography)(() =>
  sx({
    fontWeight: 'bold',
    fontSize: {
      xs: '1.5rem',
      md: '2.5rem',
    },
  })
);

export const SupportDescription = styled(Typography)(({ theme }) =>
  sx({
    color: theme.palette.text.secondary,
    textAlign: 'center',
    fontSize: {
      xs: '0.9rem',
      md: '1rem',
    },
  })
);

export const SupportBuyMeACoffee = styled(Box)(() =>
  sx({
    mt: 4,
  })
);
