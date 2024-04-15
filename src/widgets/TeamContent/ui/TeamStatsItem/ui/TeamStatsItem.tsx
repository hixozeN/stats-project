import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import cls from './TeamStatsItem.module.scss';

interface TeamStatsItemProps {
  icon: ReactElement,
  title: string,
  result: string | number,
}

export const TeamStatsItem = (props: TeamStatsItemProps) => {
  const { icon, title, result } = props;
  const { t } = useTranslation('teamPage');

  return (
    <li className={cls.item}>
      <div className={cls.icon}>{icon}</div>
      <span className={cls.text}>{t(`${title}`)}</span>
      <span className={cls.results}>{result}</span>
    </li>
  );
};
