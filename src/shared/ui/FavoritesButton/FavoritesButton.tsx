import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import {
  getFavoritesPlayersState,
} from 'entities/Favorites/model/selectors';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { favoritesPlayersActions } from 'entities/Favorites/model/slice/favoritesPlayersSlice';
import { Tooltip } from 'shared/ui/Tooltip/Tooltip';
import { useTranslation } from 'react-i18next';
import { useEffect } from 'react';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import { IFavoritesData } from 'entities/Favorites/model/types';
import { fetchFavoritesData } from 'entities/Favorites/model/services/fetchFavoritesData/fetchFavoritesData';
import cls from './FavoritesButton.module.scss';

export type FavoritesButtonTheme = 'leaderboard' | 'table' | 'profile' | 'search';

// export type TagButton = 'players' | 'clans';

interface IFavoritesButtonProps {
  className?: string;
  id: number,
  tag: string;
  theme: FavoritesButtonTheme;
}

export const FavoritesButton = (props: IFavoritesButtonProps) => {
  const {
    className,
    id,
    tag,
    theme,
  } = props;
  const dispatch = useAppDispatch();

  // const clans = useSelector(getFavoritesClansState);
  const players = useSelector(getFavoritesPlayersState);
  const { t } = useTranslation('main');

  const { device } = useSizeScreen();
  const isMobile = device === 'mobile';

  useEffect(() => {
    if ('favoritesPlayers' in localStorage) {
      dispatch(favoritesPlayersActions.setFavoritesPlayers(JSON.parse(localStorage.getItem('favoritesPlayers'))));
    }
  }, [dispatch]);

  const getData = {
    players,
    clans: players,
  };
  console.log(players);
  const isFavorite = getData && getData.players.some((item: IFavoritesData) => item.account_id === id);
  const onClick = () => {
    if (isFavorite) {
      dispatch(favoritesPlayersActions.deleteFavoritesPlayer({ account_id: id }));
    } else {
      dispatch(favoritesPlayersActions.addFavoritesPlayer({ account_id: id }));
      dispatch(fetchFavoritesData({ account_id: id }));
    }
  };

  const buttonTheme = theme === 'profile' ? 'team' : 'clear';

  if (theme === 'profile' && isMobile) {
    return (
      <Button
        className={classNames(
          cls.favoritesButton,
          { [cls.active]: isFavorite },
          [className, cls[theme]],
        )}
        theme={buttonTheme}
        variant="star"
        onClick={onClick}
      >
        {isFavorite ? t('В избранном') : t('В избранное')}
      </Button>
    );
  }

  return (
    <Button
      className={classNames(
        cls.favoritesButton,
        { [cls.active]: isFavorite },
        [className, cls[theme]],
      )}
      theme={buttonTheme}
      variant="star"
      onClick={onClick}
    >
      {theme !== 'search'
        && (
          <Tooltip
            className={cls.favoritesTooltip}
            text={isFavorite ? t('Убрать из избранного') : t('Добавить в избранное')}
            theme="favorites"
            isVisible
          />
        )}
    </Button>
  );
};
