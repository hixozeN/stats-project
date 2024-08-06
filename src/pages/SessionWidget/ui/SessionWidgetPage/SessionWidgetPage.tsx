import { memo } from 'react';
import { ErrorBoundary } from 'app/providers/ErrorBoundary';
import { useSearchParams } from 'react-router-dom';
import { WidgetParams } from 'features/createSessionWidget';
import { SessionWidgetError } from '../SessionWidgetError/SessionWidgetError';
import { SessionWidgetContent } from '../SessionWidgetContent/SessionWidgetContent';
import { useGetSessionIdQuery } from '../../api/sessionWidgetApi';

const SessionWidgetPage = () => {
  const [searchParams] = useSearchParams();
  const accountId = Number(searchParams.get(WidgetParams.ACCOUNT_ID));
  const bg = searchParams.get(WidgetParams.BG);

  const {
    data, isError,
  } = useGetSessionIdQuery({ accountId }, { pollingInterval: 30000 });

  if (isError) {
    return (
      <SessionWidgetError bgColor={bg} />
    );
  }

  return (
    <ErrorBoundary>
      <SessionWidgetContent sessionId={data?.lastSessionId} />
    </ErrorBoundary>
  );
};

export default memo(SessionWidgetPage);
