import { Box, Button } from '@mui/material';
import { FC } from 'react';
import { Platform } from '../../../modals/Plaftorm';

const PlatformButton: FC<Platform> = (props) => {
  return (
    <Box sx={{ px: 1, py: 1 }}>
      <a href={props.url} target="_blank" rel="noreferrer">
        <Button variant="outlined" color="inherit" startIcon={<props.icon />}>
          {props.name}
        </Button>
      </a>
    </Box>
  );
};

export default PlatformButton;
