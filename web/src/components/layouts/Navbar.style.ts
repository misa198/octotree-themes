import { Box, Button, Typography, Toolbar, styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';
import Image from 'components/common/Image';
import AvatarButton from 'components/common/AvatarButton';

export const NavbarLogoWrapper = styled(Box)(() =>
  sx({
    display: 'flex',
    alignItems: 'center',
  })
);

export const NavbarLogo = styled(Image)(() =>
  sx({
    width: '45px',
    mr: 2,
  })
);

export const NavbarContainer = styled(Toolbar)(() =>
  sx({
    height: '74px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
  })
);

export const LogoText = styled(Typography)(() => sx({}));

export const NavLinks = styled(Box)(() =>
  sx({
    px: {
      xs: 2,
      md: 3,
    },
    display: {
      xs: 'none',
      md: 'flex',
    },
    justifyContent: 'center',
  })
);

export const NavLink = styled(Typography)(() =>
  sx({
    px: 2.5,
    fontSize: '0.95rem',
    transition: 'all 0.2s ease-in-out',
  })
);

export const InstallButton = styled(Button)(({ theme }) =>
  sx({
    px: 5,
    boxShadow: 'none',
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
    transition: 'all 0.2s ease-in-out',
    '&:hover': {
      backgroundColor: theme.palette.common.white,
      color: theme.palette.primary.main,
      transform: 'translateY(-2px)',
    },
    display: {
      xs: 'none',
      md: 'flex',
    },
  })
);

export const MenuButton = styled(AvatarButton)(({ theme }) =>
  sx({
    display: {
      xs: 'flex',
      md: 'none',
    },
    backgroundColor: theme.palette.common.white,
    color: theme.palette.primary.main,
  })
);
