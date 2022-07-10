import { FC } from 'react';
import { MenuListItemButton, MenuListItemIcon } from './MenuListItem.style';
import { ListItemText, Typography } from '@mui/material';
import { TablerIcon } from '@tabler/icons';

interface Props {
  label: string;
  icon: TablerIcon;
  isActive?: boolean;
  onClick?: () => void;
}

const MenuListItem: FC<Props> = ({
  isActive = false,
  label,
  onClick,
  ...rest
}) => (
  <MenuListItemButton isActive={isActive} onClick={onClick}>
    <MenuListItemIcon>
      <rest.icon stroke={1.5} fontSize="1.3rem" />
    </MenuListItemIcon>
    <ListItemText
      primary={
        <Typography variant="h5" color="inherit">
          {label}
        </Typography>
      }
    />
  </MenuListItemButton>
);

export default MenuListItem;
