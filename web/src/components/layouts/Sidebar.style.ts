import { Box, Drawer, styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

export const SidebarWrapper = styled(Box)(() =>
  sx({
    flexShrink: { md: 0 },
    display: {
      xs: 'flex',
      md: 'none',
    },
  })
);

export const SidebarContainer = styled(Drawer)(({ theme }) =>
  sx({
    display: {
      xs: 'flex',
      md: 'none',
    },

    '& .MuiDrawer-paper': {
      width: '250px',
      pt: 4,
      pl: 2,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      borderRight: 'none',
      pr: 2,
    },
  })
);

export const SideBarLogo = styled(Box)(() =>
  sx({
    mt: 2,
    mb: 1,
  })
);
