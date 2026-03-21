import InfoIcon from 'shared/assets/icons/info.svg';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { AppLink } from '../AppLink/AppLink';
import { BTooltip } from '../BTooltip/BTooltip';
import cls from './WN8InfoTooltip.module.scss';

export const WN8InfoTooltip = () => {
  const { t } = useTranslation();
  const location = useLocation();

  const tooltipContent = (
    <p>
      <span>{t('WN8_INFO_TOOLTIP_TITLE')}</span>
      <AppLink to="/wn8" state={{ from: location.pathname }} className={cls.wn8link}>{t('WN8_INFO_TOOLTIP_LINK')}</AppLink>
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
