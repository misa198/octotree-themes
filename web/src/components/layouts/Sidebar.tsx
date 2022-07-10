import { FC } from 'react';
import { useAppDispatch, useAppSelector } from 'app/hooks/redux';
import {
  IconDashboard,
  IconHome,
  IconCompass,
  IconBrandSketch,
  IconBrandTabler,
} from '@tabler/icons';
import { toggleDrawer } from 'app/store/features/layout/layoutSlice';
import { SidebarContainer, SidebarWrapper } from './Sidebar.style';
import SidebarList from './SidebarList';
import { useTranslation } from 'react-i18next';

const Sidebar: FC = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isOpenDrawer = useAppSelector((state) => state.layout.isOpenDrawer);

  const onCloseDrawer = () => {
    dispatch(toggleDrawer());
  };

  const menuLinks = [
    {
      label: t('layout.navbar.home'),
      icon: IconHome,
      to: '/',
    },
    {
      label: t('layout.navbar.feature'),
      icon: IconDashboard,
      to: '/features',
    },
    {
      label: t('layout.navbar.about'),
      icon: IconCompass,
      to: '/about',
    },
    {
      label: t('layout.navbar.support'),
      icon: IconBrandSketch,
      to: '/support',
    },
    {
      label: t('layout.navbar.install'),
      icon: IconBrandTabler,
      to: '/install',
    },
  ];

  return (
    <SidebarWrapper>
      <SidebarContainer
        variant="temporary"
        open={isOpenDrawer}
        onClose={onCloseDrawer}
        anchor="left"
        ModalProps={{ keepMounted: true }}
        color="inherit"
      >
        <SidebarList items={menuLinks} />
      </SidebarContainer>
    </SidebarWrapper>
  );
};

export default Sidebar;
