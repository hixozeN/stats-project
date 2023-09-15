import { FC } from 'react';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button, ButtonTheme } from 'shared/ui/Button/Button';
import cls from './LangSwitcher.module.scss';

interface LangSwitcherProps {
  className?: string;
  isShort?: boolean;
}

export const LangSwitcher: FC<LangSwitcherProps> = ({ className, isShort = false }) => {
  const { t, i18n } = useTranslation();

  const toggleTranslate = () => i18n.changeLanguage(i18n.language === 'ru' ? 'en' : 'ru');

  return (
    <Button
      className={classNames(cls.LangSwitcher, {}, [className])}
      theme={ButtonTheme.INVERTED}
      onClick={toggleTranslate}
    >
      {isShort ? t('ЯзыкСокращенно') : t('Язык')}
    </Button>
  );
};
