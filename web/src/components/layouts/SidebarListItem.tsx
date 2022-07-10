import { FC, useMemo } from 'react';
import { matchPath } from 'react-router';
import MenuListItem from 'components/common/MenuListItem';
import { MenuItem } from 'modals/MenuItem';
import { Link, useLocation } from 'react-router-dom';
import { useAppDispatch } from '../../app/hooks/redux';
import { toggleDrawer } from '../../app/store/features/layout/layoutSlice';

interface MenuListItemProps {
  item: MenuItem;
}

const SidebarListItem: FC<MenuListItemProps> = ({ item }) => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isActive = useMemo(
    () => Boolean(matchPath(`${item.to}/*`, location.pathname)),
    [item.to, location.pathname]
  );

  const onCloseDrawer = () => {
    dispatch(toggleDrawer());
  };

  return (
    <Link to={item.to} onClick={onCloseDrawer}>
      <MenuListItem isActive={isActive} icon={item.icon} label={item.label} />
    </Link>
  );
};

export default SidebarListItem;
