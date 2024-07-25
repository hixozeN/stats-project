import { memo, useCallback, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Flex, Select } from 'antd';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { Skeleton } from 'shared/ui/Skeleton/Skeleton';
import InfoIcon from 'shared/assets/icons/info.svg';
import { Modal } from 'shared/ui/Modal/Modal';
import {
  getRatingLeaderboardInitiated,
  getRatingLeague,
  getSeasonInfo,
} from '../../model/selectors/ratingSelectors';
import {
  getRatingLeaderboard,
} from '../../model/services/getRatingLeaderboard';
import { ratingActions } from '../../model/slice/ratingSlice';
import {
  RatingSeasonInformation,
} from '../RatingSeasonInformation/RatingSeasonInformation';
import cls from './RatingLeaderboard.module.scss';

interface RatingLeaguesProps {
  className?: string;
}

export const RatingLeagues = memo((props: RatingLeaguesProps) => {
  const { className } = props;
  const seasonInfo = useSelector(getSeasonInfo);
  const league = useSelector(getRatingLeague);
  const { t } = useTranslation('rating');
  const dispatch = useAppDispatch();
  const isInitiated = useSelector(getRatingLeaderboardInitiated);
  const [enterAnimation, setEnterAnimation] = useState(false);
  const [leaveAnimation, setLeaveAnimation] = useState(false);
  const [lastLeague, setLastLeague] = useState(0);
  const [currentLeague, setCurrentLeague] = useState(0);
  const [isModalOpen, setModalOpen] = useState(false);

  const handleModal = useCallback(() => setModalOpen(!isModalOpen), [isModalOpen]);

  const handleChangeLeague = (id: number) => {
    setLastLeague(league);
    dispatch(ratingActions.setLeague(id));
    dispatch(getRatingLeaderboard({ replace: true }));
    setEnterAnimation(true);
    setTimeout(() => {
      setEnterAnimation(false);
      setLeaveAnimation(true);

      setTimeout(() => {
        setLeaveAnimation(false);
        setCurrentLeague(id);
      }, 100);
    }, 200);
  };

  const getRatingLeagues = () => seasonInfo.leagues.map((l) => ({
    value: l.index,
    label: (
      <>
        <img
          width={15}
          src={`https:${l.small_icon}`}
          alt={`${t('ICON')} ${t(l.title)}`}
        />
        {t(l.title)}
      </>
    ),
  }));

  const bgAnimationMods = {
    [cls.bgEnterAnimation]: enterAnimation,
    [cls.bgLeaveAnimation]: leaveAnimation,
  };

  if (!isInitiated) {
    return (
      <Flex
        className={classNames(cls.ratingLeagues, {}, [className])}
        justify="space-between"
        align="center"
      >
        <div className={cls.leagueShieldWrapper}>
          <Skeleton className={cls.leagueShieldWrapper} borderRadius="50%" />
        </div>
        <Flex>
          <Flex className={cls.leaderboardHeading} align="center" vertical>
            <Skeleton borderRadius="15px" width={200} height={24} />
            <Skeleton borderRadius="15px" width={168} height={24} />
          </Flex>
        </Flex>
        <Flex vertical>
          <Skeleton borderRadius="15px" width={200} height={42} />
        </Flex>
      </Flex>
    );
  }

  return (
    <>
      <Modal isOpen={isModalOpen} onClose={handleModal}>
        <RatingSeasonInformation />
      </Modal>
      <Flex
        className={classNames(cls.ratingLeagues, {}, [className])}
        justify="space-between"
        align="center"
      >
        <div
          className={classNames(cls.leagueShieldWrapper, bgAnimationMods)}
          style={{ backgroundImage: `url(https:${seasonInfo.leagues[currentLeague].background})` }}
        >
          {
          enterAnimation && (
            <div
              className={classNames(cls.leagueWrapperAnimated)}
              style={{ backgroundImage: `url(https:${seasonInfo.leagues[lastLeague].background})` }}
            >
              <img
                className={cls.leagueShieldAnimated}
                src={`https://${seasonInfo.leagues[lastLeague].big_icon}`}
                alt={t(`${seasonInfo.leagues[lastLeague].title}`)}
              />
            </div>
          )
        }
          <img
            className={cls.leagueShield}
            src={`https://${seasonInfo.leagues[currentLeague].big_icon}`}
            alt={t(`${seasonInfo.leagues[currentLeague].title}`)}
          />
        </div>
        <Flex>
          <Flex className={cls.leaderboardHeading} align="center" vertical>
            <h1 className={cls.title}>{t('RATING_LEADERBOARD_TITLE')}</h1>
            <button className={cls.season} aria-label={t('SEASON_INFO')} type="button" onClick={handleModal}>
              {t('CURRENT_SEASON', { season: seasonInfo.current_season })}
              <InfoIcon className={cls.infoIcon} />
            </button>
          </Flex>
        </Flex>
        <Flex vertical>
          <Select
            defaultValue={0}
            options={getRatingLeagues()}
            className={cls.select}
            popupClassName={cls.dropdown}
            onChange={handleChangeLeague}
          />
        </Flex>
      </Flex>
    </>
  );
});
