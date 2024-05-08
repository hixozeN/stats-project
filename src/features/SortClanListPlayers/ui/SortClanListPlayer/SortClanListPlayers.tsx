import React, { useRef, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { classNames } from 'shared/lib/classNames/classNames';
import { useClickOutside } from 'shared/hooks/useClickOutside';
import { getClanMembers } from 'entities/Lesta';
import {
  sortListPlayersActions,
} from 'features/SortClanListPlayers/model/slice/SortListPlayerSlice';
import { usersClan } from 'widgets/TeamMembersTable/lib/usersClan';
import { SortClanListPlayersItem } from '../SortClanListPlayersItem/ui/SortClanListPlayersItem';
import cls from './SortClanListPlayers.module.scss';
import { sortList } from '../../config/sortList';

export const SortClanListPlayers = () => {
  const { t } = useTranslation('teamPage');

  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const members = useSelector(getClanMembers);
  const menuRef = useRef(null);

  useClickOutside(menuRef, () => {
    if (!isOpen) return null;
    if (isOpen) setTimeout(() => setIsOpen(false), 150);
    return null;
  });

  const handleReset = () => {
    dispatch(sortListPlayersActions.setSortListPLayers({
      data: usersClan(members),
      param: null,
      isDESC: null,
    }));
  };

  return (
    <div className={cls.container}>
      <ul
        className={classNames(cls.list, { [cls.open]: isOpen })}
        ref={menuRef}
      >
        {sortList.map(({ name, param }) => (
          <SortClanListPlayersItem
            key={param}
            name={t(name)}
            param={param}
          />
        ))}
        <li className={cls.item}>
          <Button
            theme="icon-right"
            variant="close"
            className={cls.buttonReset}
            onClick={handleReset}
          >
            {t('RESET')}
          </Button>
        </li>
      </ul>
      <Button
        className={cls.buttonSort}
        theme="icon-right"
        variant="sort"
        onClick={() => setIsOpen(!isOpen)}
      >
        {t('SORT')}
      </Button>
    </div>
  );
};
