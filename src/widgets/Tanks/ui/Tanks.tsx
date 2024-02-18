import { memo } from 'react';
import { useMatch } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { LestaTankStats } from 'entities/Lesta';
import { Tank } from 'entities/Tank/ui/Tank/Tank';
import cls from './Tanks.module.scss';

interface TanksProps {
  dataList?: LestaTankStats[];
}

export const Tanks = memo(({ dataList }: TanksProps) => {
  const isAuthPage = useMatch(RoutePath.auth);
  const { t } = useTranslation('tank');

  if (isAuthPage) return null;

  const filterList = dataList;

  return (
    <section className={cls.tanks}>
      <h2 className={cls.title}>{`${t('Техника')} (${filterList.length})`}</h2>
      <ul className={cls.list}>
        {filterList.map((data) => (
          <Tank data={data} key={data.tank_id} />
        ))}
      </ul>
    </section>
  );
});
