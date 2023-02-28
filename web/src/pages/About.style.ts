import { Box, Typography, styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

export const AboutWrapper = styled(Box)(() =>
  sx({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: 10,
  })
);

export const AboutTitle = styled(Typography)(() =>
  sx({
    fontWeight: 'bold',
    fontSize: {
      xs: '1.5rem',
      md: '2.5rem',
    },
  })
);

export const AboutSubTitle = styled(Typography)(() =>
  sx({
    fontWeight: 'bold',
    fontSize: {
      xs: '1rem',
      md: '1.5rem',
    },
  })
);

export const AboutDescription = styled(Typography)(({ theme }) =>
  sx({
    color: theme.palette.text.secondary,
    textAlign: 'center',
    fontSize: {
      xs: '0.9rem',
      md: '1rem',
    },
  })
);

export const AboutContactItems = styled(Box)(() =>
  sx({
    display: 'flex',
    alignItems: 'center',
  })
);

export const AboutContactItem = styled(Box)(() =>
  sx({
    px: 1,
  })
);

export const AboutContactCredits = styled(Box)(() =>
  sx({
    mt: 2,
    maxWidth: '400px',

    ul: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',

      li: {
        display: 'flex',
        lineHeight: 1.5,

        a: {
          '*': {
            fontWeight: 'bold',
          },
        },
      },
    },
  })
);
