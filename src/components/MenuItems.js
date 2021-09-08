import { Stack } from '@twilio-paste/stack';
// import MenuItem from './MenuItem';
import { MenuItemContainer } from '../containers/MenuitemContainer'

export const MenuItems = ({ items }) => {
  return (
    <Stack orientation="vertical" spacing="space60">
      {items.map((item) => (
        <MenuItemContainer {...item} key={item.uuid} />
      ))}
    </Stack>
  );
};
