import { useCallback, useState } from 'react';
import { useTranslation } from 'react-i18next';
import Crown from 'shared/assets/icons/crown.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { Link } from 'react-router-dom';
import { FooterSocials } from './FooterSocials/FooterSocials';
import { TermsOfUse } from './TermsOfUse/TermsOfUse';
import cls from './Footer.module.scss';

interface FooterProps {
  className?: string;
  isCollapsed?: boolean;
}

export const Footer = (props: FooterProps) => {
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
        <div className={classNames(cls.container, {}, [])}>
          <div className={cls.wrapper}>
            <FooterSocials />
            <button
              className={classNames(cls.button, {}, [cls.darkText, cls.link])}
              type="button"
              onClick={() => setIsOpen(true)}
            >
              {t('USER_AGREEMENT')}
            </button>
          </div>
          <div className={cls.copyrightsWrapper}>
            <span className={classNames(cls.copyright, {}, [cls.darkText])}>
              {`${t('COPYRIGHT')} © ${currentYear}`}
            </span>
            <div className={cls.copyrightInner}>
              <span className={classNames(cls.copyright, {}, [cls.darkText])}>
                {t('LESTA_COPYRIGHT')}
              </span>
              <span className={classNames(cls.copyright, {}, [cls.darkText])}>
                {t('RESERVED')}
              </span>
            </div>
            <div className={cls.links}>
              <Link
                className={cls.link}
                to="https://tanksblitz.ru"
                target="_blank"
              >
                {t('GAME_NAME')}
              </Link>
              {' | '}
              <Link
                className={cls.link}
                to="https://lesta.ru/support"
                target="_blank"
              >
                {t('LESTA_SUPPORT')}
              </Link>
            </div>
          </div>
        </div>
      </footer>
      {isOpen && <TermsOfUse isOpen={isOpen} handleClose={handleClose} />}
    </>
  );
};
