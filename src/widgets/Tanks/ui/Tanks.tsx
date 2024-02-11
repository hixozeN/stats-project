import { memo } from 'react';
import { useMatch } from 'react-router-dom';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import { Table } from 'shared/ui/Table/Table';
import { LestaTankStats } from 'entities/Lesta';
import cls from './Tanks.module.scss';

interface TanksProps {
  data?: LestaTankStats[];
  className?: string;
}

export const Tanks = memo(({ className, data }: TanksProps) => {
  const isAuthPage = useMatch(RoutePath.auth);

  if (isAuthPage) return null;

  return (
    <div className={cls.wrapper}>
      <Table data={data} />
    </div>
  );
});
