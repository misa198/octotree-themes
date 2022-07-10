import { ListItemButton, ListItemIcon, styled } from '@mui/material';
import { experimental_sx as sx } from '@mui/system';

interface MenuListItemButtonProps {
  isActive: boolean;
}

export const MenuListItemButton = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'isActive',
})<MenuListItemButtonProps>(({ theme, isActive }) =>
  sx({
    display: 'flex',
    alignItems: 'end',
    borderRadius: '12px !important',
    px: 2.5,
    py: 1.5,
    mb: 0.5,
    backgroundColor: isActive ? theme.palette.primary.light : 'transparent',
    '&, svg': {
      color: isActive
        ? theme.palette.text.primary
        : theme.palette.text.primary,
    },

    '&:hover': {
      '&, svg': {
        backgroundColor: theme.palette.primary.light,
      },
    },
    transition: 'none',
  }),
);

export const MenuListItemIcon = styled(ListItemIcon)(() =>
  sx({
    my: 'auto',
    minWidth: 40,
  }),
);
