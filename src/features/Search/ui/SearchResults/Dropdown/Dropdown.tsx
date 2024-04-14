import React, {
  memo,
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
    className, tab,
  } = props;
  const { t } = useTranslation('search');
  const players = useSelector(getSearchPlayers);
  const clans = useSelector(getSearchClans);
  const isLoading = useSelector(getSearchIsLoading);
  const [loadingSearch, setLoadingSearch] = useState<boolean>(false);
  const { search } = useSelector(getSearchState);
  const [message, setMessage] = useState('');
  const debouncedSearch = useDebounce(search, 500);

  const dataPlayers = useMemo(() => players.map((player) => (
    {
      id: player.account_id,
      name: player.nickname,
      link: `/user/${player.account_id}`,
      tag: null,
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

  const data = useMemo(() => [dataPlayers, dataClans], [dataPlayers, dataClans]);

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

  if (isLoading || loadingSearch) return <Loader className={cls.loader} />;

  return (
    <div className={classNames(cls.Dropdown, {}, [className])}>
      {message ? <span className={cls.notFound}>{message}</span> : (
        <ul className={cls.list}>
          {data[tab].map((item) => (
            <DropdownItem
              key={item?.id}
              link={item?.link}
              icon={item?.icon}
              name={item?.name}
              tag={item?.tag}
            />
          ))}
        </ul>
      )}
    </div>
  );
});
