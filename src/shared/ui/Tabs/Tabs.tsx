import { memo, useState } from 'react';
import { Tab } from 'shared/ui/Tabs/Tab';
import cls from 'src/shared/ui/Tabs/Tabs.module.scss';

interface TabsProps {
  initialTab?: number;
  tabList: string[];
}

export const Tabs = memo((props: TabsProps) => {
  const {
    initialTab = 1,
    tabList,
  } = props;
  const [tab, setTab] = useState(initialTab);

  return (
    <ul className={cls.navList}>
      {tabList.map((item, i) => <Tab key={item} tabName={item} isActive={tab === i} toggleTab={() => setTab(i)} />)}
    </ul>
  );
});
