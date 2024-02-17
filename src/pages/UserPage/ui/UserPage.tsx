import {
  memo, useCallback, useEffect, useState,
} from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { t } from 'i18next';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import { classNames } from 'shared/lib/classNames/classNames';
import { Background } from 'shared/ui/Background/Background';
import { Tabs } from 'shared/ui/Tabs/Tabs';
import Loader from 'shared/ui/Loader/Loader';
import { UserStats } from 'widgets/UserStats';
import { UserProfile } from 'widgets/UserProfile';
import { Tanks } from 'widgets/Tanks';
import {
  fetchLestaUserDataById,
  fetchLestaUserTanksDataById,
  getLestaLoadingStatus,
  getLestaUserFetchStatus,
  getLestaUserTanks,
  PersonalUserDataResponse,
} from 'entities/Lesta';
import { LestaUserData } from 'entities/User/index';
import cls from './UserPage.module.scss';

interface IUserPageProps {
  className?: string;
}

const tabList = ['Статистика', 'Сессия', 'Рейтинг'];

const UserPage = ({ className }: IUserPageProps) => {
  const { id } = useParams<{ id: string }>();
  const [user, setUser] = useState(null);
  const [tab, setTab] = useState(0);
  const isLoading = useSelector(getLestaLoadingStatus);
  const isNotFound = useSelector(getLestaUserFetchStatus);
  const tanks = useSelector(getLestaUserTanks);

  const dispatch = useDispatch();

  const getData = useCallback(
    async (accountId: string): Promise<LestaUserData | void> => {
      const userId = Number(accountId);
      try {
        const res = await axios.get<PersonalUserDataResponse>(
          `${LESTA_API_URL}/account/info/?application_id=${LESTA_APP_ID}&account_id=${userId}`,
        );

        const lestaDTO = (data: PersonalUserDataResponse): LestaUserData => {
          const {
            nickname,
            account_id,
            created_at,
            last_battle_time,
            statistics,
          } = data.data[`${accountId}`];

          return {
            nickname,
            account_id,
            created_at,
            last_battle_time,
            statistics: {
              battles: statistics.all.battles,
              capture_points: statistics.all.capture_points,
              damage_dealt: statistics.all.damage_dealt,
              damage_received: statistics.all.damage_received,
              spotted: statistics.all.spotted,
              max_frags_tank_id: statistics.all.max_frags_tank_id,
              hits: statistics.all.hits,
              frags: statistics.all.frags,
              max_xp: statistics.all.max_xp,
              max_xp_tank_id: statistics.all.max_xp_tank_id,
              wins: statistics.all.wins,
              losses: statistics.all.losses,
              max_frags: statistics.all.max_frags,
              shots: statistics.all.shots,
              frags8p: statistics.all.frags8p,
              xp: statistics.all.xp,
              win_and_survived: statistics.all.win_and_survived,
              survived_battles: statistics.all.survived_battles,
              dropped_capture_points: statistics.all.dropped_capture_points,
            },
          };
        };

        return lestaDTO(res.data);
      } catch (e) {
        // eslint-disable-next-line no-console
        return console.log(e?.data?.message);
      }
    },
    [],
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userData = await getData(id);
        setUser(userData);
      } catch (e) {
        // eslint-disable-next-line no-console
        console.error(e?.data?.message);
      }
    };

    dispatch(fetchLestaUserDataById({ id: Number(id) }));
    dispatch(fetchLestaUserTanksDataById({ id: Number(id) }));
    fetchData();
  }, [id, getData, dispatch]);

  if (isLoading) return <Loader />;

  if (isNotFound && !isLoading) {
    return (
      <ErrorBoundary>
        <Background />
        <main className={classNames(cls.UserPage, {}, [className])}>
          <div className={cls.wrapper}>{t('Пользователь не найден.')}</div>
        </main>
      </ErrorBoundary>
    );
  }

  return (
    <ErrorBoundary>
      <Background />
      {/* <main className={classNames(cls.UserPage, {}, [className])}> */}
      <div className={cls.wrapper}>
        <UserProfile user={user} />
        <Tabs tab={tab} tabList={tabList} handleChangeTab={setTab} />
        <UserStats tab={tab} user={user} />
        <Tanks dataList={tanks} />
      </div>
      {/* </main> */}
    </ErrorBoundary>
  );
};

export default memo(UserPage);
