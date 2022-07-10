import { Box, Button, IconButton, Typography, styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';
import backgroundImg from 'assets/images/home-background.png';
import Image from 'components/common/Image';

export const IntroductionSectionWrapper = styled(Box)(({ theme }) =>
  sx({
    width: '100vw',
    minHeight: '100vh',
    backgroundImage: `url(${backgroundImg})`,
    backgroundSize: 'cover',
    backgroundPosition: 'center left',
    backgroundRepeat: 'no-repeat',
    pt: '80px',
  })
);

export const IntroductionContainer = styled(Box)(({ theme }) =>
  sx({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  })
);

export const IntroductionLogo = styled(Image)(() =>
  sx({
    width: {
      xs: '100px',
      md: '128px',
    },
    mt: {
      xs: 10,
      md: 14,
    },
  })
);

export const IntroductionTitle = styled(Typography)(() =>
  sx({
    mt: 4,
    fontSize: {
      xs: '1.8rem',
      md: '2.5rem',
    },
    fontWeight: 'bold',
  })
);

export const IntroductionDescription = styled(Typography)(({ theme }) =>
  sx({
    mt: 2,
    textAlign: 'center',
    color: theme.palette.text.secondary,
    maxWidth: {
      xs: '80%',
      md: '50%',
    },
    fontSize: {
      xs: '0.95rem',
      md: '1rem',
    },
  })
);

export const IntroductionInstallBtn = styled(Button)(({ theme }) =>
  sx({
    mt: 4,
    px: 8,
    fontSize: '1.5rem',
    textTransform: 'uppercase',
  })
);

export const GithubButton = styled(IconButton)(({ theme }) =>
  sx({
    mt: 4,
    color: theme.palette.common.white,
  })
);
