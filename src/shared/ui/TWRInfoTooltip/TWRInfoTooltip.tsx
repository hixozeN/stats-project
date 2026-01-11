import InfoIcon from 'shared/assets/icons/info.svg';
import { useTranslation } from 'react-i18next';
import { BTooltip } from '../BTooltip/BTooltip';
import cls from './TWRInfoTooltip.module.scss';

export const TWRInfoTooltip = () => {
  const { t } = useTranslation();

  const tooltipContent = (
    <p>
      <span>{t('TWR_INFO_TOOLTIP_TITLE')}</span>
      <a href="https://lesta.ru/support/ru/products/tb/article/34518/" className={cls.twrlink} target="_blank" rel="noopener noreferrer">{t('TWR_INFO_TOOLTIP_LINK')}</a>
    </p>
  );

  return (
    <BTooltip
      title={tooltipContent}
      underlinePosition="none"
    >
      <InfoIcon className={cls.infoIcon} />
    </BTooltip>
  );
};
