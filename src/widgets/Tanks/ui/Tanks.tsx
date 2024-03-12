import { memo, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Filter } from 'features/Filter';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Tank } from 'entities/Tank/ui/Tank/Tank';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import cls from './Tanks.module.scss';

interface TanksProps {
  dataList?: TUserTanks[];
}

export const Tanks = memo(({ dataList }: TanksProps) => {
  const isAuthPage = useMatch(RoutePath.auth);
  const [filterList, setFilterList] = useState(dataList);

  if (isAuthPage) return null;

  return (
    <section className={cls.tanks}>
      <Filter filterList={filterList} />
      <ul className={cls.list}>
        {dataList.map((data: TUserTanks) => (
          <Tank data={data} key={data.tank_id} />
        ))}
      </ul>
    </section>
  );
});
