import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useMatch } from 'react-router-dom';
import { Filter } from 'features/Filter';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Tank } from 'entities/Tank/ui/Tank/Tank';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { getIsActiveFilter } from 'features/Filter/model/selectors/getIsActiveFilter/getIsActiveFilter';
import { Button } from 'shared/ui/Button/Button';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { getLestaUserTanks, getUserSessionTanks } from 'entities/Lesta';
import { filterActions } from 'features/Filter/model/slice/filterSlice';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { getDataFilterState } from 'features/Filter/model/selectors/getDataFilterState/getDataFilterState';
import { sortActions } from 'features/Filter/model/slice/sortSlice';
import cls from './Tanks.module.scss';
import { DEVICE_SETTING } from '../config/deviceData';
import { getWordTanks } from '../lib/getWordTanks';
import { getRestTanks } from '../lib/getRestTanks';

interface TanksProps {
  tab?: number;
}

export const Tanks = memo(({ tab }: TanksProps) => {
  const isAuthPage = useMatch(RoutePath.auth);
  const tanks = useSelector(getLestaUserTanks);
  const sessionTanks = useSelector(getUserSessionTanks);

  const getTanksList = useCallback(
    (tabIndex): TUserTanks[] => {
      if (tabIndex === 0) {
        return tanks;
      }
      if (tabIndex === 1) {
        return sessionTanks;
      }
      return [];
    },
    [sessionTanks, tanks],
  );

  const isActiveFilter = useSelector(getIsActiveFilter);
  const filterList = useSelector(getDataFilterState) || getTanksList(tab);
  const [moreMovies, setMoreMovies] = useState(0);
  const [isShowMoreButton, setShowMoreButton] = useState(false);
  const [maxShowMovies, setMaxShowMovies] = useState(0);
  const { device } = useSizeScreen();
  const dispatch = useAppDispatch();

  const handleClickMore = useCallback(() => {
    setMaxShowMovies((maxMovies) => maxMovies + moreMovies);
  }, [moreMovies]);

  useEffect(() => {
    setMaxShowMovies(DEVICE_SETTING[device].maxMovies);
    setMoreMovies(DEVICE_SETTING[device].moreMovies);
  }, [device, filterList]);

  useEffect(() => {
    dispatch(filterActions.setFilterData(getTanksList(tab)));
    dispatch(filterActions.clearFilter());
    dispatch(sortActions.clearSort());
  }, [dispatch, getTanksList, tab]);

  useEffect(() => {
    if (filterList) {
      if (!(filterList.length <= maxShowMovies)) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
    }
  }, [filterList, maxShowMovies]);

  const titleFilter = useCallback(
    () => (isActiveFilter
      ? `У игрока ${filterList.length} ${getWordTanks(
        filterList.length,
      )} с выбранными параметрами`
      : `У игрока ${filterList.length} ${getWordTanks(filterList.length)}`),
    [filterList, isActiveFilter],
  );

  if (isAuthPage) return null;

  return (
    <section className={cls.tanks}>
      <h2 className={cls.title}>{titleFilter()}</h2>
      <Filter tab={tab} />
      <ul className={cls.list}>
        {filterList.slice(0, maxShowMovies).map((data: TUserTanks) => (
          <Tank data={data} key={data.tank_id} tab={tab} />
        ))}
      </ul>
      {isShowMoreButton && (
        <Button
          className={cls.buttonMore}
          size="size_xl"
          onClick={handleClickMore}
        >
          {t(
            `Ещё ${getRestTanks(filterList, maxShowMovies)} ${getWordTanks(
              getRestTanks(filterList, maxShowMovies),
            )}`,
          )}
        </Button>
      )}
    </section>
  );
});
