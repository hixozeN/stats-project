import { TUserSessionMeta } from 'entities/Lesta/model/types/users';
import { classNames } from 'shared/lib/classNames/classNames';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import cls from './UserStatsSessionDates.module.scss';

interface UserStatsSessionDatesProps {
  className?: string;
  userSessionMeta?: TUserSessionMeta;
}

export const UserStatsSessionDates = (props: UserStatsSessionDatesProps) => {
  const { className, userSessionMeta } = props;

  const dateTo = formatDate(userSessionMeta?.session?.dateTo);
  const dateFrom = formatDate(userSessionMeta?.session?.dateFrom);
  const sessionInfo = `Данные сессии с ${dateFrom} по ${dateTo}`;

  if (!userSessionMeta?.session?.dateTo || !userSessionMeta?.session?.dateFrom) {
    return null;
  }

  return (
    <div className={classNames(cls.SessionDates, {}, [className])}>
      {sessionInfo}
    </div>
  );
};
