import { classNames } from 'shared/lib/classNames/classNames';
import { memo } from 'react';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { Background } from 'shared/ui/Background/Background';
import { SessionWidget } from 'widgets/SessionWidget';
import cls from './WidgetSettingsPage.module.scss';

interface WidgetSettingsPageProps {
  className?: string;
}

const WidgetSettingsPage = (props: WidgetSettingsPageProps) => {
  const { className } = props;

  return (
    <ErrorBoundary>
      <Background />
      <div className={classNames(cls.WidgetSettingsPage, {}, [className])}>
        <div className={cls.wrapper}>
          <SessionWidget />
        </div>
      </div>
    </ErrorBoundary>
  );
};

export default memo(WidgetSettingsPage);
