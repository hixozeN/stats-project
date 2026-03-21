import { TUserSessionMeta } from 'entities/Lesta/model/types/users';
import { classNames } from 'shared/lib/classNames/classNames';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { useTranslation } from 'react-i18next';
import cls from './UserStatsSessionDates.module.scss';

interface UserStatsSessionDatesProps {
  className?: string;
  userSessionMeta?: TUserSessionMeta;
}

export const UserStatsSessionDates = (props: UserStatsSessionDatesProps) => {
  const { className, userSessionMeta } = props;

  const { t } = useTranslation('userPage');

  const dateTo = formatDate(userSessionMeta?.session?.dateTo);
  const dateFrom = formatDate(userSessionMeta?.session?.dateFrom);

  if (!userSessionMeta?.session?.dateTo || !userSessionMeta?.session?.dateFrom) {
    return null;
  }

  return (
    <div className={classNames(cls.SessionDates, {}, [className])}>
      {t('SESSION_DURATION', { start: dateFrom, end: dateTo })}
    </div>
  );
};
