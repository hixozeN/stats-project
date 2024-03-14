import React, {
  Dispatch, memo, SetStateAction, useCallback, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { formatDate } from 'shared/lib/formatDate/formatDate';
import { LOCAL_STORAGE_LESTA } from 'shared/consts/localstorage';
import {
  fetchLestaUserDataById,
  getLestaUserSessions,
  LestaUserSession,
} from 'entities/Lesta/index';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { getUserData } from 'entities/User/model/selectors/getUserData/getUserData';
import cls from './SessionControlSection.module.scss';

interface SessionControlSectionProps {
  className?: string;
  id?: number;
  setSession: Dispatch<SetStateAction<LestaUserSession>>;
}

export const SessionControlSection = memo((props: SessionControlSectionProps) => {
  const { className, id, setSession } = props;
  const { t } = useTranslation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const dispatch = useAppDispatch();
  const userSessions = useSelector(getLestaUserSessions);
  const reversedUserSessions = [...userSessions].reverse();
  const currentUser = useSelector(getUserData);

  const isProfileOwner = currentUser?.lestaData?.account_id === id;

  const handleUpdateSession = useCallback((shouldUpdateSession: boolean) => {
    const lestaAccessToken = JSON.parse(localStorage.getItem(LOCAL_STORAGE_LESTA.TOKEN));
    dispatch(fetchLestaUserDataById(
      { id, shouldRefreshSession: shouldUpdateSession, lestaAccessToken },
    ));
  }, [dispatch, id]);

  const handleChangeSession = useCallback((targetSession) => {
    setSession(targetSession);
    setIsMenuOpen(false);
  }, [setSession]);

  const handleChangeMenu = useCallback((e: React.MouseEvent<HTMLButtonElement | HTMLDivElement>) => {
    e.stopPropagation();
    setIsMenuOpen(!isMenuOpen);
  }, [isMenuOpen]);

  if (!userSessions.length) return <div className={cls.sessionListContainer} />;

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
        {
          isProfileOwner && (
            <Button
              theme="clear"
              onClick={() => handleUpdateSession(false)}
              className={cls.sessionsHistoryBtn}
            >
              {t('Обновить данные')}
            </Button>
          )
        }
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
              onClick={() => handleChangeSession(item)}
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
