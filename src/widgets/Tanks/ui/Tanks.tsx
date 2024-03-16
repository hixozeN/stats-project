import { memo, useState } from 'react';
import { useMatch } from 'react-router-dom';
import { Filter } from 'features/Filter';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Tank } from 'entities/Tank/ui/Tank/Tank';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
import { t } from 'i18next';
import cls from './Tanks.module.scss';

interface TanksProps {
  dataList?: TUserTanks[];
}

export const Tanks = memo(({ dataList }: TanksProps) => {
  const isAuthPage = useMatch(RoutePath.auth);
  const [filterList, setFilterList] = useState(dataList);
  let wordTanks;

  if (isAuthPage) return null;

  const numberTanks = filterList.length > 10 && filterList.length < 20
    ? filterList.length.toString()
    : filterList.length.toString().slice(-1);

  switch (numberTanks) {
    case '1':
      wordTanks = 'танк';
      break;
    case '2':
    case '3':
    case '4':
      wordTanks = 'танка';
      break;
    default:
      wordTanks = 'танков';
      break;
  }

  return (
    <section className={cls.tanks}>
      <h2 className={cls.title}>
        {`В ангаре ${filterList.length} ${wordTanks} с выбранными параметрами`}
      </h2>
      <Filter filterList={filterList} />
      <ul className={cls.list}>
        {dataList.map((data: TUserTanks) => (
          <Tank data={data} key={data.tank_id} />
        ))}
      </ul>
    </section>
  );
});
