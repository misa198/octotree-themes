import { FC } from 'react';
import { Box, CircularProgress, Container } from '@mui/material';

const Fallback: FC = () => (
  <Container>
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        width: '100%',
        py: 4,
      }}
    >
      <CircularProgress />
    </Box>
  </Container>
);

export default Fallback;
