import { ReactElement } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { BTooltip } from 'shared/ui/BTooltip/BTooltip';
import cls from './TeamStatsItem.module.scss';

interface TeamStatsItemProps {
  icon: ReactElement,
  title: string,
  result: string | number,
}

export const TeamStatsItem = (props: TeamStatsItemProps) => {
  const { icon, title, result } = props;
  const { t } = useTranslation('teamPage');

  const isVisible = title === t('WN8') && result === 0;

  const handleTooltip = () => {
    if (isVisible) {
      return (
        <BTooltip
          title={t('TOOLTIP')}
          underlineStyle="dashed"
        >
          {t('NONE')}
        </BTooltip>
      );
    }
    return result;
  };

  return (
    <li className={cls.item}>
      <div className={cls.icon}>{icon}</div>
      <div className={cls.container}>
        <span className={cls.text}>{t(`${title}`)}</span>
        <span className={classNames(cls.results, {}, [])}>
          {handleTooltip()}
        </span>
      </div>
    </li>
  );
};
