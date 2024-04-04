import React, {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import {
  getUserLastSessionId,
  getUserSessions,
  fetchLestaUserSessionById,
  fetchUserDataByLestaId,
} from 'entities/Lesta';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { LOCAL_STORAGE_LESTA } from 'shared/consts/localstorage';
import cls from './SessionControlSection.module.scss';

interface SessionControlSectionProps {
  className?: string;
  id?: number;
}

export const SessionControlSection = memo((props: SessionControlSectionProps) => {
  const {
    className, id,
  } = props;
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [currentSession, setCurrentSession] = useState(null);

  const dispatch = useAppDispatch();
  const userSessions = useSelector(getUserSessions);
  const reversedUserSessions = userSessions ? [...userSessions].reverse() : [];
  const userLastSession = useSelector(getUserLastSessionId);

  const handleUpdateSessionData = useCallback(() => {
    dispatch(fetchLestaUserSessionById(
      { sessionId: currentSession },
    ));

    const lestaAccessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LESTA.TOKEN));
    dispatch(fetchUserDataByLestaId({
      id: Number(id),
      lestaAccessToken: lestaAccessToken ?? null,
    }));
  }, [id, dispatch, currentSession]);

  const handleChangeSession = useCallback((targetSession) => {
    dispatch(fetchLestaUserSessionById({ sessionId: targetSession }));
    setCurrentSession(targetSession);
    setIsMenuOpen(false);
  }, [dispatch]);

  const handleChangeMenu = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  useEffect(() => {
    if (userLastSession && currentSession === null) {
      setCurrentSession(userLastSession.id);
    }
  }, [currentSession, userLastSession]);

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
