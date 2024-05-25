import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import {
  Filter, getDataFilterState, getIsActiveFilter, filterActions, sortActions,
} from 'features/Filter';
import { Tank } from 'entities/Tank';
import { Button } from 'shared/ui/Button/Button';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import {
  getLestaUserTanks,
  getUserDataLoadingStatus,
  getUserSessionTanks, TUserTanks,
} from 'entities/Lesta';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import { TankSearch } from 'shared/ui/BackToTopButton/BackToTopButton';
import { DEVICE_SETTING } from '../config/deviceData';
import { getWordTanks } from '../lib/getWordTanks';
import { getRestTanks } from '../lib/getRestTanks';
import cls from './Tanks.module.scss';

interface TanksProps {
  tab?: number;
}

export const Tanks = memo(({ tab }: TanksProps) => {
  const isUserDataLoading = useSelector(getUserDataLoadingStatus);
  const tanks = useSelector(getLestaUserTanks);
  const sessionTanks = useSelector(getUserSessionTanks);

  const { t } = useTranslation('tank');

  const getTanksList = useCallback(
    (tabIndex: number): TUserTanks[] => {
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
    dispatch(filterActions.clearFilter());
    dispatch(filterActions.clearSearch());
    dispatch(sortActions.clearSort());

    if (tab === 0 && tanks?.length > 0) {
      dispatch(filterActions.setFilterData(tanks));
    }

    if (tab === 1 && sessionTanks?.length > 0) {
      dispatch(filterActions.setFilterData(sessionTanks));
    }
  }, [dispatch, tanks, sessionTanks, tab]);

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
      ? `${t('PLAYER_HAS')} ${filterList.length} ${t(
        `${getWordTanks(filterList.length)}`,
      )} 
      ${t('WITH_PARAMETERS')}`
      : `${t('PLAYER_HAS')} ${filterList.length} ${t(
        `${getWordTanks(filterList.length)}`,
      )}`),
    [filterList.length, isActiveFilter, t],
  );

  if (tab === 1 && !sessionTanks?.length) {
    return (
      <section className={cls.tanks}>
        <h2 className={cls.title}>{t('NO_SESSION_TANKS')}</h2>
      </section>
    );
  }

  return (
    <section className={cls.tanks}>
      {isUserDataLoading ? (
        <Skeleton className={cls.title} borderRadius="5px" />
      ) : (
        <h2 className={cls.title}>{titleFilter()}</h2>
      )}
      <Filter tab={tab} dataList={getTanksList(tab)} />
      <ul className={cls.list}>
        {filterList.slice(0, maxShowMovies)
          .map((data: TUserTanks) => (
            <Tank data={data} key={data.tank_id} tab={tab} />
          ))}
      </ul>
      {isShowMoreButton && (
        <Button
          className={cls.buttonMore}
          size="size_xl"
          onClick={handleClickMore}
        >
          {`${t('Ещё')} ${getRestTanks(filterList, maxShowMovies)} 
          ${t(`${getWordTanks(getRestTanks(filterList, maxShowMovies))}`)}`}
        </Button>
      )}
      <TankSearch />
    </section>
  );
});
