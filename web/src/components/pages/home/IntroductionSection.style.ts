import { Box, styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';
import backgroundImg from 'assets/images/home-background.png';

export const IntroductionSectionWrapper = styled(Box)(({ theme }) =>
  sx({
    width: '100vw',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    pt: '80px',
  })
);
