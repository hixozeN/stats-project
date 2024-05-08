import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { ToolTip } from 'shared/ui/ToolTip/ToolTip';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TeamStatsItem.module.scss';

interface TeamStatsItemProps {
  icon: ReactElement,
  title: string,
  result: string | number,
}

export const TeamStatsItem = (props: TeamStatsItemProps) => {
  const { icon, title, result } = props;
  const { t } = useTranslation('teamPage');

  const isVisible = title === 'WN8' && result === 0;

  return (
    <li className={cls.item}>
      <div className={cls.icon}>{icon}</div>
      <div className={cls.container}>
        <span className={cls.text}>{t(`${title}`)}</span>
        <span className={classNames(cls.results, { [cls.visible]: isVisible }, [])}>
          {title === 'WN8' && result === 0 ? 'нет' : result}
          <ToolTip text={t('TOOLTIP')} isVisible={isVisible} className={cls.tooltip} />
        </span>
      </div>
    </li>
  );
};
