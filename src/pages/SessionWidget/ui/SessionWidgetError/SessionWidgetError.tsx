import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import cls from '../SessionWidgetPage/SessionWidgetPage.module.scss';

interface SessionWidgetErrorProps {
  bgColor: string;
  className?: string;
}

export const SessionWidgetError = memo((props: SessionWidgetErrorProps) => {
  const { className, bgColor } = props;
  const { t } = useTranslation('widgets');

  return (
    <div
      style={{
        backgroundColor: bgColor,
      }}
      className={classNames(cls.SessionWidgetPage, {}, [className])}
    >
      <span className={cls.error}>
        {t('WIDGET_ERROR')}
      </span>
    </div>
  );
});
