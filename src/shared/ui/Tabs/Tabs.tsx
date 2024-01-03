import { memo } from 'react';
import { Tab } from 'shared/ui/Tabs/Tab';
import cls from './Tabs.module.scss';

interface TabsProps {
  tab: number;
  tabList: string[];
  isUppercase?: boolean;
  // eslint-disable-next-line no-unused-vars
  handleChangeTab: (i: number) => void;
}

export const Tabs = memo((props: TabsProps) => {
  const { tab, tabList, handleChangeTab, isUppercase } = props;

  return (
    <ul className={cls.navList}>
      {tabList.map((item, i) => (
        <Tab
          key={item}
          tabName={item}
          isActive={tab === i}
          toggleTab={() => handleChangeTab(i)}
          isUppercase={isUppercase}
        />
      ))}
    </ul>
  );
});
