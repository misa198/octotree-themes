import { Box, CircularProgress, Container, useTheme } from '@mui/material';
import { FC } from 'react';

const Fallback: FC = () => {
  const theme = useTheme();

  return (
    <Container>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'center',
          width: '100%',
          py: 8,
          bgcolor: theme.palette.background.default,
        }}
      >
        <CircularProgress
          sx={{
            color: theme.palette.secondary.main,
          }}
        />
      </Box>
    </Container>
  );
};

export default Fallback;
