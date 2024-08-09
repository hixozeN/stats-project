import { ReactElement } from 'react';
import CreateIcon from '../../assets/icons/button/create.svg';
import EditIcon from '../../assets/icons/button/edit.svg';
import JoinIcon from '../../assets/icons/button/add.svg';
import SaveIcon from '../../assets/icons/button/save.svg';
import BlockIcon from '../../assets/icons/button/block.svg';
import AddFriendIcon from '../../assets/icons/button/add-friend.svg';
import InvitePlayerIcon from '../../assets/icons/button/invite.svg';
import KickPlayerIcon from '../../assets/icons/button/kick.svg';
import DisbandIcon from '../../assets/icons/button/disband.svg';
import LeaveTeamIcon from '../../assets/icons/button/leave.svg';
import EditLogoIcon from '../../assets/icons/button/edit-logo.svg';
import NotificationIcon from '../../assets/icons/button/notification.svg';
import MessagesIcon from '../../assets/icons/button/message.svg';
import ActionsIcon from '../../assets/icons/button/dots-vertical.svg';
import DownIcon from '../../assets/icons/button/chevron-down.svg';
import Magnifier from '../../assets/icons/button/magnifier.svg';
import Burger from '../../assets/icons/button/burger.svg';
import Close from '../../assets/icons/button/close.svg';
import DownArrow from '../../assets/icons/button/down-arrow.svg';
import SortIcon from '../../assets/icons/button/sort.svg';
import FilterIcon from '../../assets/icons/button/filter.svg';
import StarIcon from '../../assets/icons/button/star-fill.svg';

export const BUTTON_ICONS: Record<string, ReactElement> = {
  create: <CreateIcon />,
  edit: <EditIcon />,
  join: <JoinIcon />,
  save: <SaveIcon />,
  block: <BlockIcon />,
  'add-friend': <AddFriendIcon />,
  'invite-player': <InvitePlayerIcon />,
  'kick-player': <KickPlayerIcon />,
  disband: <DisbandIcon />,
  'leave-team': <LeaveTeamIcon />,
  'edit-logo': <EditLogoIcon />,
  notification: <NotificationIcon />,
  'send-message': <MessagesIcon />,
  actions: <ActionsIcon />,
  'chevron-down': <DownIcon />,
  magnifier: <Magnifier />,
  burger: <Burger />,
  close: <Close />,
  'down-arrow': <DownArrow />,
  sort: <SortIcon />,
  filter: <FilterIcon />,
  star: <StarIcon />,
};
