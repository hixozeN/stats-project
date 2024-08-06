import { memo, ReactNode } from 'react';
import {
  WidgetParams,
  WidgetStrip,
  WidgetTheme,
  WidgetTile,
} from 'features/createSessionWidget';
import { classNames } from 'shared/lib/classNames/classNames';
import Loader from 'shared/ui/Loader/Loader';
import { useSearchParams } from 'react-router-dom';
import { useGetSessionDataQuery } from '../../api/sessionWidgetApi';
import { SessionWidgetError } from '../SessionWidgetError/SessionWidgetError';
import cls from '../SessionWidgetPage/SessionWidgetPage.module.scss';

interface SessionWidgetContentProps {
  sessionId: string;
  className?: string;
}

export const SessionWidgetContent = memo((props: SessionWidgetContentProps) => {
  const { sessionId, className } = props;

  const [searchParams] = useSearchParams();

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

  if (!sessionId || isError) {
    return (
      <SessionWidgetError bgColor={bg} />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  return (
    <div
      style={{
        backgroundColor: bg,
      }}
      className={classNames(cls.SessionWidgetPage, {}, [className])}
    >
      {content[widgetTheme]}
    </div>
  );
});
