import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useSelector } from 'react-redux';
import {
  getFavoritesPlayersState,
} from 'entities/Favorites/model/selectors';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { favoritesPlayersActions } from 'entities/Favorites/model/slice/favoritesPlayersSlice';
import { useEffect } from 'react';
import cls from './FavoritesButton.module.scss';

export type FavoritesButtonTheme = 'leaderboard' | 'table'

interface IFavoritesButtonProps {
  className?: string;
  id: number,
  tag: string;
  theme?: FavoritesButtonTheme;
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

  useEffect(() => {
    if ('favoritesPlayers' in localStorage) {
      // ToDo: нужен ли локалсторедж?
      dispatch(favoritesPlayersActions.setFavoritesPlayers(JSON.parse(localStorage.getItem('favoritesPlayers'))));
    }
  }, []);

  const getData = tag === 'players' ? players : players;

  const isFavorite = getData.some((item) => item === id);
  const onClick = () => {
    if (isFavorite) {
      dispatch(favoritesPlayersActions.deleteFavoritesPlayer(id));
    } else {
      dispatch(favoritesPlayersActions.addFavoritesPlayer(id));
    }
  };

  return (
    <Button
      className={classNames(
        cls.favoritesButton,
        { [cls.active]: isFavorite },
        [className, cls[theme]],
      )}
      theme="clear"
      variant="star"
      onClick={onClick}
    />
  );
};
