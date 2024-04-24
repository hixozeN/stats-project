import React, {
  memo, useCallback, useEffect, useMemo, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import {
  getUserSessions,
  fetchLestaUserSessionById, fetchUserDataByLestaId, getUserLestaId, getUserLastSessionId,
} from 'entities/Lesta';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { getLestaAccessToken } from 'entities/User/index';
import cls from './SessionControlSection.module.scss';

interface SessionControlSectionProps {
  className?: string;
}

export const SessionControlSection = memo((props: SessionControlSectionProps) => {
  const {
    className,
  } = props;
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  const dispatch = useAppDispatch();
  const userSessions = useSelector(getUserSessions);
  const userId = useSelector(getUserLestaId);
  const lestaAccessToken = useSelector(getLestaAccessToken);
  const lastSessionId = useSelector(getUserLastSessionId);
  const reversedUserSessions = useMemo(() => (userSessions ? [...userSessions].reverse() : []), [userSessions]);

  useEffect(() => {
    setCurrentSession(lastSessionId);
  }, [lastSessionId]);

  const handleUpdateSessionData = useCallback(() => {
    dispatch(fetchUserDataByLestaId({
      id: userId,
      lestaAccessToken,
    }))
      .unwrap()
      .then((res) => {
        const sessionId = res.userData.personal.sessions.length > 0
          ? [...res.userData.personal.sessions].pop().id
          : null;

        if (sessionId) {
          dispatch(fetchLestaUserSessionById({ sessionId: currentSession }));
        }
      });
  }, [dispatch, userId, lestaAccessToken, currentSession]);

  const handleChangeSession = useCallback((targetSession) => {
    dispatch(fetchLestaUserSessionById({ sessionId: targetSession }));
    setCurrentSession(targetSession);
    setIsMenuOpen(false);
  }, [dispatch]);

  const handleChangeMenu = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  if (!userSessions || !reversedUserSessions) return <div className={cls.sessionListContainer} />;

  return (
    <>
      <div
        tabIndex={0}
        role="button"
        aria-label={t('Закрыть список сессий')}
        className={classNames(cls.overlay, { [cls.overlayActive]: isMenuOpen })}
        onClick={handleChangeMenu}
      />
      <section className={classNames(cls.sessionListContainer, {}, [className])}>
        <Button
          theme="clear"
          onClick={handleUpdateSessionData}
          className={cls.sessionsHistoryBtn}
        >
          {t('Обновить данные')}
        </Button>
        <Button
          theme="icon-right"
          variant="chevron-down"
          size="size_m"
          onClick={handleChangeMenu}
          className={cls.sessionsHistoryBtn}
        >
          {t('История сессий')}
        </Button>
        <ul
          className={classNames(cls.sessionList, { [cls.sessionListOpened]: isMenuOpen })}
        >
          {reversedUserSessions.map((item) => (
            <li
              className={cls.sessionItem}
              onClick={() => handleChangeSession(item.id)}
              key={item.id}
            >
              {formatDate(item.session_date)}
            </li>
          ))}
        </ul>
      </section>
    </>
  );
});
