import { TSessionDates } from 'entities/Lesta/model/types/users';
import { classNames } from 'shared/lib/classNames/classNames';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import cls from './UserStatsSessionDates.module.scss';

interface UserStatsSessionDatesProps {
  className?: string;
  userSessionDates?: TSessionDates;
}

export const UserStatsSessionDates = (props: UserStatsSessionDatesProps) => {
  const { className, userSessionDates } = props;

  const dateTo = formatDate(userSessionDates?.session?.dateTo);
  const dateFrom = formatDate(userSessionDates?.session?.dateFrom);
  const sessionInfo = `Данные сессии с ${dateFrom} по ${dateTo}`;

  if (!userSessionDates?.session?.dateTo || !userSessionDates?.session?.dateFrom) {
    return null;
  }

  return (
    <div className={classNames(cls.SessionDates, {}, [className])}>
      {sessionInfo}
    </div>
  );
};
