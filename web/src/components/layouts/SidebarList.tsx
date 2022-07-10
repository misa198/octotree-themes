import { FC } from 'react';
import { List } from '@mui/material';
import SidebarListItem from './SidebarListItem';
import { MenuItem } from 'modals/MenuItem';

interface MenuListProps {
  items: MenuItem[];
}

const SidebarList: FC<MenuListProps> = ({ items }) => (
  <List>
    {items.map((item) => (
      <SidebarListItem key={item.label} item={item} />
    ))}
  </List>
);

export default SidebarList;
