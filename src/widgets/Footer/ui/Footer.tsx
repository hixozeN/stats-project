import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Crown from 'shared/assets/icons/crown.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { FooterSocials } from './FooterSocials/FooterSocials';
import { TermsOfUse } from './TermsOfUse/TermsOfUse';
import cls from './Footer.module.scss';

interface FooterProps {
  className?: string;
  isCollapsed?: boolean;
}

export const Footer = (props : FooterProps) => {
  const { className, isCollapsed } = props;
  const { t } = useTranslation('footer');
  const currentYear = new Date().getFullYear();
  const [isOpen, setIsOpen] = useState<boolean>(false);

  const handleClose = useCallback(() => {
    setIsOpen(false);
  }, []);

  return (
    <>
      <footer className={classNames(cls.Footer, { [cls.collapsed]: !isCollapsed }, [className])}>
        <Crown className={cls.crownBackground} />
        <div className={classNames(cls.container, { }, [])}>
          <div className={cls.wrapper}>
            <FooterSocials />
            <button
              className={classNames(cls.button, {}, [cls.darkText])}
              type="button"
              onClick={() => setIsOpen(true)}
            >
              {t('USER_AGREEMENT')}
            </button>
          </div>
          <span className={classNames(cls.copyright, {}, [cls.darkText])}>
            {`${t('COPYRIGHT')}© ${currentYear}` }
          </span>
        </div>
      </footer>
      <TermsOfUse isOpen={isOpen} handleClose={handleClose} />
    </>
  );
};
