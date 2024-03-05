import { memo } from 'react';
import { useMatch } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { LestaTankStats } from 'entities/Lesta';
import { Tank } from 'entities/Tank/ui/Tank/Tank';
import { Filter } from 'shared/ui/Filter/Filter';
import cls from './Tanks.module.scss';

interface TanksProps {
  dataList?: LestaTankStats[];
}

export const Tanks = memo(({ dataList }: TanksProps) => {
  const isAuthPage = useMatch(RoutePath.auth);
  if (isAuthPage) return null;

  const filterList = dataList;

  return (
    <section className={cls.tanks}>
      <Filter dataList={dataList} />
      <ul className={cls.list}>
        {filterList.map((data) => (
          <Tank data={data} key={data.tank_id} />
        ))}
      </ul>
    </section>
  );
});
