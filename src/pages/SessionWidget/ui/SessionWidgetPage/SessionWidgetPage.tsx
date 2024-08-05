import { classNames } from 'shared/lib/classNames/classNames';
import { memo, ReactNode } from 'react';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { useSearchParams } from 'react-router-dom';
import {
  WidgetParams, WidgetStrip,
  WidgetTheme,
  WidgetTile,
} from 'features/createSessionWidget';
import Loader from 'shared/ui/Loader/Loader';
import { useTranslation } from 'react-i18next';
import { useGetSessionDataQuery } from '../../api/sessionWidgetApi';
import cls from './SessionWidgetPage.module.scss';

interface SessionWidgetPageProps {
  className?: string;
}

const SessionWidgetPage = (props: SessionWidgetPageProps) => {
  const { className } = props;
  const { t } = useTranslation('widgets');
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get(WidgetParams.SESSION_ID);
  const widgetTheme = searchParams.get(WidgetParams.THEME) as WidgetTheme;
  const bg = searchParams.get(WidgetParams.BG);

  const {
    data, isLoading, isError,
  } = useGetSessionDataQuery({ sessionId }, { pollingInterval: 30000 });

  const content: Record<WidgetTheme, ReactNode> = {
    [WidgetTheme.TILE_ROW]: <WidgetTile data={data} />,
    [WidgetTheme.TILE_COLUMN]: <WidgetTile data={data} />,
    [WidgetTheme.ROW]: <WidgetStrip data={data} />,
    [WidgetTheme.COLUMN]: <WidgetStrip data={data} />,
  };

  if (isError) {
    return (
      <div
        style={{
          backgroundColor: bg,
        }}
        className={classNames(cls.SessionWidgetPage, {}, [className])}
      >
        <span className={cls.error}>
          {t('WIDGET_ERROR')}
        </span>
      </div>
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <ErrorBoundary>
      <div
        style={{
          backgroundColor: bg,
        }}
        className={classNames(cls.SessionWidgetPage, {}, [className])}
      >
        {content[widgetTheme]}
      </div>
    </ErrorBoundary>
  );
};

export default memo(SessionWidgetPage);
