import { memo } from 'react';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { useSearchParams } from 'react-router-dom';
import { WidgetParams } from 'features/createSessionWidget';
import Loader from 'shared/ui/Loader/Loader';
import { SessionWidgetError } from '../SessionWidgetError/SessionWidgetError';
import { SessionWidgetContent } from '../SessionWidgetContent/SessionWidgetContent';
import { useGetSessionIdQuery } from '../../api/sessionWidgetApi';

const SessionWidgetPage = () => {
  const [searchParams] = useSearchParams();
  const accountId = Number(searchParams.get(WidgetParams.ACCOUNT_ID));
  const bg = searchParams.get(WidgetParams.BG);

  const {
    data, isLoading, isError,
  } = useGetSessionIdQuery({ accountId });

  if (isError) {
    return (
      <SessionWidgetError bgColor={bg} />
    );
  }

  if (isLoading) {
    return <Loader />;
  }

  if (!data?.lastSessionId) {
    return (
      <SessionWidgetError bgColor={bg} />
    );
  }

  return (
    <ErrorBoundary>
      <SessionWidgetContent sessionId={data.lastSessionId} />
    </ErrorBoundary>
  );
};

export default memo(SessionWidgetPage);
