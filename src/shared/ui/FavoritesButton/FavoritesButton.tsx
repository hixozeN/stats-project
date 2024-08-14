import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { ILeaderboardItem } from 'features/playersLeaderboard';
import { useSelector } from 'react-redux';
import {
  getFavoritesPlayersState,
} from 'entities/Favorites/model/selectors';
import { IFavoritesData } from 'entities/Favorites/model/types';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { favoritesPlayersActions } from 'entities/Favorites/model/slice/favoritesPlayersSlice';
import cls from './FavoritesButton.module.scss';

interface IFavoritesButtonProps {
  className?: string;
  dataItem?: ILeaderboardItem;
  tag: string;
}

export const FavoritesButton = (props: IFavoritesButtonProps) => {
  const {
    className,
    dataItem,
    tag,
  } = props;
  const dispatch = useAppDispatch();
  // const clans = useSelector(getFavoritesClansState);
  const players = useSelector(getFavoritesPlayersState);

  const getData = tag === 'players' ? players : players;

  const isFavorite = getData.some((item: IFavoritesData) => item.id === dataItem.account_id);
  const onClick = () => {
    if (isFavorite) {
      dispatch(favoritesPlayersActions.deleteFavoritesPlayer({
        id: dataItem.account_id,
        name: dataItem.nickname,
      }));
    } else {
      dispatch(favoritesPlayersActions.addFavoritesPlayer({
        id: dataItem.account_id,
        name: dataItem.nickname,
      }));
    }
  };

  return (
    <Button
      className={classNames(cls.favoritesButton, { [cls.active]: isFavorite }, [className])}
      theme="clear"
      variant="star"
      onClick={onClick}
    />
  );
};
