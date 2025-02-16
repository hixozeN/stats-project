import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useTranslation } from 'react-i18next';
import { useSizeScreen } from 'shared/hooks/useSizeScreen';
import {
  FavoriteClan,
  getFavoriteClansState, getFavoritePlayersState, isFavoritesToggleLoading,
  addClanToFavorites, removeClanFromFavorites,
  addPlayerToFavorites, removePlayerFromFavorites,
} from 'entities/Favorites';
import { useSelector } from 'react-redux';
import cls from './FavoritesButton.module.scss';

export type FavoritesButtonTheme = 'leaderboard' | 'table' | 'profile' | 'search';

type ActionType = 'player' | 'clan';

interface BaseFavoriteButtonProps {
  theme: FavoritesButtonTheme;
  type: ActionType;
  className?: string;
}

// interface IFavoritesButtonProps {
//   theme: FavoritesButtonTheme;
//   type: ActionType;
//   className?: string;
//   id: number,
//   clan: any;
// }

type IFavoritesButtonProps = BaseFavoriteButtonProps & (
  | { type: 'player'; id: number; clan?: FavoriteClan; }
  | { type: 'clan'; id?: number; clan: FavoriteClan; }
  );

export const FavoritesButton = (props: IFavoritesButtonProps) => {
  const {
    className,
    id,
    theme,
    type,
    clan,
  } = props;
  const dispatch = useAppDispatch();

  const players = useSelector(getFavoritePlayersState);
  const clans = useSelector(getFavoriteClansState);
  const isToggling = useSelector(isFavoritesToggleLoading);
  const { t } = useTranslation('main');

  const { device } = useSizeScreen();
  const isMobile = device === 'mobile';

  const isFavorite = type === 'player'
    ? players?.some((p) => p.lestaData.account_id === id)
    : clans?.some((c) => c.clan_id === clan.clan_id);

  const handleControlPlayer = () => {
    if (!isFavorite) {
      dispatch(addPlayerToFavorites({ account_id: id, type: theme }));
    } else {
      dispatch(removePlayerFromFavorites({ account_id: id }));
    }
  };

  const handleControlClan = () => {
    if (!isFavorite) {
      dispatch(addClanToFavorites({ clanData: clan }));
    } else {
      dispatch(removeClanFromFavorites({ clan_id: clan.clan_id }));
    }
  };

  const onClick = () => {
    if (isToggling) return;

    if (type === 'player') {
      handleControlPlayer();
    } else {
      handleControlClan();
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
    />
  );
};
