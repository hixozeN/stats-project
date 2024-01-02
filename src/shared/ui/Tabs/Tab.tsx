import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import cls from 'shared/ui/Tabs/Tabs.module.scss';
import { useTranslation } from 'react-i18next';

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
  const { t } = useTranslation('tabs');

  return (
    <li
      className={classNames(cls.navItem, { [cls.active]: isActive }, [])}
      onClick={toggleTab}
    >
      <Button className={cls.tabBtn} theme="clear">{t(tabName)}</Button>
    </li>
  );
});
