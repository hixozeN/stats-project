import { createAsyncThunk } from '@reduxjs/toolkit';
import { ThunkConfig } from 'app/providers/StoreProvider';
// import { lestaActions } from '../../slice/lestaSlice';
// import { LestaUserSession } from '../../types/users';
import { LestaData } from '../../types';
import { userTanksActions } from '../../slice/lestaTanksSlice';

interface ThunkProps {
  id: number | number[];
  lestaAccessToken?: string;
  // shouldRefreshSession?: boolean;
}

// interface Session {
//   session: LestaUserSession;
// }

export const fetchLestaUserDataByIdV2 = createAsyncThunk<
  LestaData,
  ThunkProps,
  ThunkConfig<string>
>('LESTA_USER_TANKS', async (ThunkProps, thunkAPI) => {
  // деструктурируем нужные данные из thunkAPI
  const { rejectWithValue, dispatch, extra } = thunkAPI;
  const {
    id = 1,
    lestaAccessToken = '',
    // shouldRefreshSession = false,
  } = ThunkProps;
  const serverError = 'Проблема соединения. Попробуйте позже.';
  // отправка запроса
  try {
    // обновляем сессию игрока
    // if (shouldRefreshSession) {
    //   await extra.royalApi.patch(
    //     'http://localhost:3030/sessions/update',
    //     {},
    //     { withCredentials: true },
    //   );
    // }

    // отправляем пост запрос через аксиос с собранными данными
    const response = await extra.royalApi.get<LestaData>(
      `/user/v2/?id=${id}${
        lestaAccessToken ? `&accessToken=${lestaAccessToken}` : ''
      }`,
    );

    // прокидываем ошибку, если данных нет
    if (!response.data) return rejectWithValue(serverError);

    // const sessions: LestaUserSession[] = [];

    // if (response.data.userData.personal.sessions) {
    //   const promises = response.data.userData.personal.sessions.map(
    //     async (session) => {
    //       const sessionData = await extra.royalApi.get<Session>(
    //         `/sessions/${session}`,
    //       );
    //       return sessionData;
    //     },
    //   );

    //   // Ожидаем выполнения всех запросов
    //   const sessionsRes = await Promise.all(promises);

    //   sessionsRes.forEach((session) => {
    //     sessions.push({
    //       id: session.data.session._id,
    //       ...session.data.session,
    //     });
    //   });
    // }

    // записываем в стейт полученные данные
    dispatch(
      userTanksActions.setUserTanks([
        ...response.data.userTanks,
      ]),
    );

    // if (response.data.userData.personal.sessions) {
    //   const lastUserSession = response.data.userData.personal.sessions[
    //     response.data.userData.personal.sessions.length - 1
    //   ];

    //   const userSession = await extra.royalApi.get<Session>(
    //     `/sessions/${lastUserSession}`,
    //   );

    //   if (userSession.data.session) {
    //     dispatch(
    //       lestaActions.setLastSession({
    //         id: userSession.data.session._id,
    //         ...userSession.data.session,
    //       }),
    //     );
    //   }
    // }

    // возвращаем полученные данные
    return response.data;
  } catch (e) {
    // возвращаем ошибку с бэка
    console.log(serverError);

    return rejectWithValue(e?.response?.data?.message || serverError);
  }
});
