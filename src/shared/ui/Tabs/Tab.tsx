import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from 'shared/ui/Tabs/Tabs.module.scss';

interface ITabProps {
  tabName: string;
  isActive: boolean;
  toggleTab: () => void;
}

export const Tab = memo((props: ITabProps) => {
  const {
    tabName,
    isActive,
    toggleTab,
  } = props;

  return (
    <li
      className={classNames(cls.navItem, { [cls.active]: isActive }, [])}
      onClick={toggleTab}
    >
      <Button className={cls.tabBtn} theme="clear">{tabName}</Button>
    </li>
  );
});
