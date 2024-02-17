import { memo } from 'react';
import { useMatch } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { LestaTankStats } from 'entities/Lesta';
import { Tank } from 'entities/Tank/ui/Tank/Tank';
import cls from './Tanks.module.scss';

interface TanksProps {
  dataList?: LestaTankStats[];
  className?: string;
}

export const Tanks = memo(({ className, dataList }: TanksProps) => {
  const isAuthPage = useMatch(RoutePath.auth);

  if (isAuthPage) return null;

  return (
    <ul className={cls.list}>
      {dataList.map((data) => (
        <Tank data={data} key={data.tank_id} />
      ))}
    </ul>
  );
});
