import { TSessionDates } from 'entities/Lesta/model/types/users';
import { classNames } from 'shared/lib/classNames/classNames';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import cls from './UserStatsSessionDates.module.scss';

interface UserStatsSessionDatesProps {
  className?: string;
  userSessionsMetaDate?: TSessionDates;
}

export const UserStatsSessionDates = (props: UserStatsSessionDatesProps) => {
  const { className, userSessionsMetaDate } = props;

  const dateTo = formatDate(userSessionsMetaDate?.session?.dateTo);
  const dateFrom = formatDate(userSessionsMetaDate?.session?.dateFrom);
  const sessionInfo = `Данные сессии с ${dateFrom} по ${dateTo}`;

  if (!userSessionsMetaDate?.session?.dateTo || !userSessionsMetaDate?.session?.dateFrom) {
    return null;
  }

  return (
    <div className={classNames(cls.SessionDates, {}, [className])}>
      {sessionInfo}
    </div>
  );
};
