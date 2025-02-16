import React, {
  memo, useContext,
  useEffect,
  useMemo,
  useState,
} from 'react';
import { useSelector } from 'react-redux';
import Loader from 'shared/ui/Loader/Loader';
import PlayerIcon from 'shared/assets/icons/button/players.svg';
import ClanIcon from 'shared/assets/icons/button/teams.svg';
import useDebounce from 'shared/hooks/useDebounce';
import { classNames } from 'shared/lib/classNames/classNames';
import { useTranslation } from 'react-i18next';
import { getFavoriteClansState, getFavoritePlayersState } from 'entities/Favorites';
import { SearchModalsContext } from '../../Search/Search';
import { getSearchState } from '../../../model/selectors/getSearchState/getSearchState';
import { getSearchClans } from '../../../model/selectors/getSearchClans/getSearchClans';
import { getSearchPlayers } from '../../../model/selectors/getSearchPlayers/getSearchPlayers';
import { getSearchIsLoading } from '../../../model/selectors/getSearchIsLoading/getSearchIsLoading';
import { DropdownItem } from '../DropdownItem/DropdownItem';
import cls from './Dropdown.module.scss';

interface IDropdown {
  className?: string,
  tab: number,
}

export const Dropdown = memo((props: IDropdown) => {
  const {
    className,
    tab,
  } = props;
  const { t } = useTranslation('search');
  const players = useSelector(getSearchPlayers);
  const clans = useSelector(getSearchClans);
  const favoritePlayers = useSelector(getFavoritePlayersState);
  const favoriteClans = useSelector(getFavoriteClansState);
  const isLoading = useSelector(getSearchIsLoading);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const { search } = useSelector(getSearchState);
  const [message, setMessage] = useState('');
  const [favoriteMessage, setFavoriteMessage] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const { searchType } = useContext(SearchModalsContext);

  const dataPlayers = useMemo(() => players.map((player) => (
    {
      id: player.account_id,
      name: player.nickname,
      link: `/user/${player.account_id}`,
      tag: player?.clan?.tag || null,
      icon: <PlayerIcon className={cls.icons} />,
    }
  )), [players]);

  const dataClans = useMemo(() => clans.map((clan) => (
    {
      id: clan.clan_id,
      name: clan.name,
      link: `/team/${clan.clan_id}`,
      tag: clan.tag,
      icon: <ClanIcon className={cls.icons} />,
    }
  )), [clans]);

  const favoriteDataPlayers = useMemo(() => favoritePlayers.map((p) => ({
    id: p.lestaData.account_id,
    name: p.username,
    link: `/user/${p.lestaData.account_id}`,
    tag: p?.tag || null,
    icon: <PlayerIcon className={cls.icons} />,
  })), [favoritePlayers]);

  const favoriteDataClans = useMemo(() => favoriteClans.map((clan) => (
    {
      id: clan.clan_id,
      name: clan.name,
      link: `/team/${clan.clan_id}`,
      tag: clan.tag,
      icon: <ClanIcon className={cls.icons} />,
    }
  )), [favoriteClans]);

  const data = useMemo(() => [dataPlayers, dataClans], [dataPlayers, dataClans]);
  const favoriteData = useMemo(() => (
    [favoriteDataPlayers, favoriteDataClans]
  ), [favoriteDataPlayers, favoriteDataClans]);

  const assignTextAndDownload = (text: string, status: boolean) => {
    setMessage(text);
    setLoadingSearch(status);
  };

  useEffect(() => {
    assignTextAndDownload('', true);
    if (search.length <= 1 && tab === 1) {
      assignTextAndDownload(`${t('Для поиска клана введите не менее 2-х символов.')}`, false);
    } else if (search.length <= 2 && tab === 0) {
      assignTextAndDownload(`${t('Для поиска игроков введите не менее 3-х символов.')}`, false);
    } else if ((!loadingSearch && debouncedSearch.length >= 3 && dataPlayers.length === 0 && tab === 0)
      || (!loadingSearch && debouncedSearch.length >= 2 && dataClans.length === 0 && tab === 1)) {
      assignTextAndDownload(`${t('Не найдены.')}`, false);
    } else {
      assignTextAndDownload('', false);
    }
  }, [dataClans, dataPlayers, search, tab, debouncedSearch, isLoading, loadingSearch, t]);

  useEffect(() => {
    setFavoriteMessage('');
    if (!favoritePlayers?.length && tab === 0) {
      setFavoriteMessage(`${t('EMPTY_FAVORITE_LIST')}`);
    } else if (!favoriteClans?.length && tab === 1) {
      setFavoriteMessage(`${t('EMPTY_FAVORITE_LIST')}`);
    }
  }, [favoritePlayers, favoriteClans, tab, t]);

  if (isLoading || loadingSearch) return <Loader className={cls.loader} />;

  if (message && searchType === 'all') {
    return (
      <div className={classNames(cls.Dropdown, {}, [className])}>
        <span className={cls.notFound}>{message}</span>
      </div>
    );
  }

  if (favoriteMessage && searchType === 'favorites') {
    return (
      <div className={classNames(cls.Dropdown, {}, [className])}>
        <span className={cls.notFound}>{favoriteMessage}</span>
      </div>
    );
  }

  return (
    <div className={classNames(cls.Dropdown, {}, [className])}>
      <ul className={cls.list}>
        {
            searchType === 'all'
              ? data[tab].map((item) => (
                <DropdownItem
                  type={tab === 0 ? 'player' : 'clan'}
                  key={item?.id}
                  link={item?.link}
                  icon={item?.icon}
                  name={item?.name}
                  tag={item?.tag}
                  id={item?.id}
                />
              ))
              : favoriteData[tab]?.map((item) => (
                <DropdownItem
                  type={tab === 0 ? 'player' : 'clan'}
                  key={item?.id}
                  link={item?.link}
                  icon={item?.icon}
                  name={item?.name}
                  tag={item?.tag}
                  id={item?.id}
                />
              ))
          }
      </ul>
    </div>
  );
});
