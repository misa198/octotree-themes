import { Box, styled, Typography } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

export const FeaturesWrapper = styled(Box)(() =>
  sx({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    py: 10,
  })
);

export const FeaturesTitle = styled(Typography)(() =>
  sx({
    fontWeight: 'bold',
    fontSize: {
      xs: '1.5rem',
      md: '2.5rem',
    },
  })
);

export const FeatureBoxContent = styled(Box)(() =>
  sx({
    width: '100%',
    mt: 4,
  })
);
