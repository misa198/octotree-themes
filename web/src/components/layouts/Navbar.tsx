import { AppBar, Container, useTheme } from '@mui/material';
import logo from 'assets/images/logo.png';
import { FC, useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import {
  InstallButton,
  LogoText,
  NavbarContainer,
  NavbarLogo,
  NavbarLogoWrapper,
  NavLink,
  NavLinks,
  MenuButton,
} from './Navbar.style';
import { IconMenu2 } from '@tabler/icons';
import Sidebar from './Sidebar';
import { useAppDispatch } from 'app/hooks/redux';
import { toggleDrawer } from 'app/store/features/layout/layoutSlice';

const Navbar: FC = () => {
  const theme = useTheme();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const [isTransparent, setIsTransparent] = useState(true);

  const openDrawer = () => {
    dispatch(toggleDrawer());
  };

  const links = [
    {
      path: '/',
      label: t('layout.navbar.home'),
    },
    {
      path: '/feature',
      label: t('layout.navbar.features'),
    },
    {
      path: '/about',
      label: t('layout.navbar.about'),
    },
    {
      path: '/support',
      label: t('layout.navbar.support'),
    },
  ];

  const changeBackground = () => {
    if (window.scrollY >= 14) {
      setIsTransparent(false);
    } else {
      setIsTransparent(true);
    }
  };

  useEffect(() => {
    window.addEventListener('scroll', changeBackground);
  }, []);

  return (
    <>
      <AppBar
        elevation={isTransparent ? 0 : 2}
        position="fixed"
        sx={{
          transition: 'all 0.2s ease-in-out',
          bgcolor: isTransparent ? 'transparent' : theme.palette.primary.dark,
        }}
      >
        <Container>
          <NavbarContainer disableGutters>
            <NavbarLogoWrapper>
              <NavbarLogo src={logo} alt="logo" />
              <LogoText variant="h4">{t('index.name')}</LogoText>
            </NavbarLogoWrapper>
            <NavLinks>
              {links.map((link) => (
                <NavLink key={link.path} variant="h5">
                  <Link to={link.path}>{link.label}</Link>
                </NavLink>
              ))}
            </NavLinks>
            <Link to="/install">
              <InstallButton variant="contained">
                {t('layout.navbar.install')}
              </InstallButton>
            </Link>
            <MenuButton onClick={openDrawer}>
              <IconMenu2 />
            </MenuButton>
          </NavbarContainer>
        </Container>
      </AppBar>
      <Sidebar />
    </>
  );
};

export default Navbar;
