import { memo } from 'react';
import {
  SessionWidgetForm,
  SessionWidgetAuthInfo,
} from 'features/createSessionWidget';
import { useSelector } from 'react-redux';
import { getCurrentUserAccountId, getLoggedInStatus } from 'entities/User';

export const SessionWidget = memo(() => {
  const isLoggedIn = useSelector(getLoggedInStatus);
  const isLestaUser = useSelector(getCurrentUserAccountId);

  if (!isLoggedIn && !isLestaUser) return <SessionWidgetAuthInfo />;

  return (
    <SessionWidgetForm />
  );
});
