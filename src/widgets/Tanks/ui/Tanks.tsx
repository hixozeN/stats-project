import { memo, useEffect, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Filter } from 'features/Filter';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Tank } from 'entities/Tank/ui/Tank/Tank';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { getDataFilterState } from 'features/Filter/model/selectors';
import { getLestaUserTanks } from 'entities/Lesta';
import { Button } from 'shared/ui/Button/Button';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import cls from './Tanks.module.scss';
import { DEVICE_SETTING } from '../config/deviceData';
import { getWordTanks } from '../lib/getWordTanks';
import { getRestTanks } from '../lib/getRestTanks';

interface TanksProps {
  dataList?: TUserTanks[];
}

export const Tanks = memo(({ dataList }: TanksProps) => {
  const isAuthPage = useMatch(RoutePath.auth);
  const filterList = useSelector(getDataFilterState) || dataList;
  const tanks = useSelector(getLestaUserTanks);
  const [moreMovies, setMoreMovies] = useState(0);
  const [isShowMoreButton, setShowMoreButton] = useState(false);
  const [maxShowMovies, setMaxShowMovies] = useState(0);
  const { device } = useSizeScreen();

  const handleClickMore = () => {
    setMaxShowMovies((maxMovies) => maxMovies + moreMovies);
  };

  useEffect(() => {
    setMaxShowMovies(DEVICE_SETTING[device].maxMovies);
    setMoreMovies(DEVICE_SETTING[device].moreMovies);
  }, [device, filterList]);

  useEffect(() => {
    if (filterList) {
      if (!(filterList.length <= maxShowMovies)) {
        setShowMoreButton(true);
      } else {
        setShowMoreButton(false);
      }
    }
  }, [filterList, maxShowMovies]);

  if (isAuthPage) return null;

  return (
    <section className={cls.tanks}>
      <h2 className={cls.title}>
        {tanks.length === filterList.length
          ? `У игрока ${filterList.length} ${getWordTanks(filterList.length)}`
          : `У игрока ${filterList.length} ${getWordTanks(
            filterList.length,
          )} с выбранными параметрами`}
      </h2>
      <Filter />
      <ul className={cls.list}>
        {filterList.slice(0, maxShowMovies).map((data: TUserTanks) => (
          <Tank data={data} key={data.tank_id} />
        ))}
      </ul>
      {isShowMoreButton && (
        <Button className={cls.buttonMore} size="size_xl" onClick={handleClickMore}>
          {t(
            `Ещё ${
              getRestTanks(filterList, maxShowMovies)
            } ${getWordTanks(getRestTanks(filterList, maxShowMovies))}`,
          )}
        </Button>
      )}
    </section>
  );
});
