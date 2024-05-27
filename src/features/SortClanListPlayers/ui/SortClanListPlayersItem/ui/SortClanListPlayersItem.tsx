import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import React, { useCallback } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  getSortClanListParam,
  getSortListIsDESC,
} from 'features/SortClanListPlayers/model/selectors';
import { getClanMembers } from 'entities/Lesta';
import { sortListPlayersActions } from '../../../model/slice/SortListPlayerSlice';
import cls from './SortClanListPlayersItem.module.scss';

interface ISortClanListPlayersItem {
  className?: string,
  name: string,
  param: string,
}

export const SortClanListPlayersItem = (props: ISortClanListPlayersItem) => {
  const {
    className, name, param,
  } = props;
  const isDESCSelector = useSelector(getSortListIsDESC);
  const members = useSelector(getClanMembers);
  const sortValue = useSelector(getSortClanListParam);
  const dispatch = useDispatch();

  const handleSort = useCallback((value: string) => {
    if (param === sortValue) {
      dispatch(sortListPlayersActions.setSortListPLayers({
        data: members,
        param: value,
        isDESC: !isDESCSelector,
      }));
    } else if (param !== sortValue) {
      dispatch(sortListPlayersActions.setSortListPLayers({
        data: members,
        param: value,
        isDESC: true,
      }));
    }
  }, [dispatch, param, sortValue, isDESCSelector, members]);

  return (
    <li
      className={classNames(
        cls.item,
        {
          [cls.activeArrow]: param === sortValue,
          [cls.up]: param === sortValue && !isDESCSelector,
          [cls.down]: param === sortValue && isDESCSelector,
        },
        [className],
      )}
    >
      <Button
        theme="icon-right"
        variant="down-arrow"
        onClick={() => handleSort(param)}
      >
        {name}
      </Button>
    </li>
  );
};
