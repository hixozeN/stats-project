import { memo } from 'react';
import { useMatch } from 'react-router-dom';
import { Filter } from 'features/Filter';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Tank } from 'entities/Tank/ui/Tank/Tank';
import { TUserTanks } from 'entities/Lesta/model/types/tanks';
// import { t } from 'i18next';
import { useSelector } from 'react-redux';
import { getDataFilterState } from 'features/Filter/model/selectors';
import { getLestaUserTanks } from 'entities/Lesta';
import cls from './Tanks.module.scss';

interface TanksProps {
  dataList?: TUserTanks[];
}

export const Tanks = memo(({ dataList }: TanksProps) => {
  const isAuthPage = useMatch(RoutePath.auth);
  const filterList = useSelector(getDataFilterState) || dataList;
  const tanks = useSelector(getLestaUserTanks);
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
        {tanks.length === filterList.length
          ? `У игрока ${filterList.length} ${wordTanks}`
          : `У игрока ${filterList.length} ${wordTanks} с выбранными параметрами`}
      </h2>
      <Filter />
      <ul className={cls.list}>
        {filterList.map((data: TUserTanks) => (
          <Tank data={data} key={data.tank_id} />
        ))}
      </ul>
    </section>
  );
});
