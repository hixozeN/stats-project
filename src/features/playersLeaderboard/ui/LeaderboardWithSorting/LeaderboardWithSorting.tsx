import React, {
  memo, useCallback, useMemo, useState,
} from 'react';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { useTranslation } from 'react-i18next';
import { useDebouncer } from 'shared/hooks/useDebouncer/useDebouncer';
import {
  Accordion, AccordionDetails, AccordionSummary, Slider,
} from '@mui/material';
import FilterIcon from 'shared/assets/icons/button/filter.svg';
import { classNames } from 'shared/lib/classNames/classNames';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { RoutePath } from 'shared/config/routeConfig/routeConfig';
import {
  leaderboardActions,
} from '../../model/slice/leaderboardSlice';
import {
  useGetPlayersLeaderboardQuery,
} from '../../api/playersLeaderboardApi';
import {
  getLeaderboardGeneralFilters,
} from '../../model/selectors/leaderboardSelectors';
import { Leaderboard } from '../Leaderboard/Leaderboard';
import cls from './LeaderboardWithSorting.module.scss';
import { SortValue } from '../../model/types/LeaderboardSchema';

interface LeaderboardWithSortingProps {
  className?: string;
}

export const LeaderboardWithSorting = memo((props: LeaderboardWithSortingProps) => {
  const { className } = props;
  const { t } = useTranslation('rating');
  const dispatch = useAppDispatch();
  const { battles, sortBy } = useSelector(getLeaderboardGeneralFilters);
  const {
    data: ratingList, isLoading, isFetching,
  } = useGetPlayersLeaderboardQuery({ battles, sortBy, limit: 100 }, {

  });
  const [battlesFilter, setBattlesFilter] = useState<number>(battles);

  const titleConfig: Record<string, string> = useMemo(() => ({
    wn8: t('WN8'),
    damage: t('AVERAGE_DAMAGE'),
    winrate: t('WINRATE'),
  }), [t]);

  const sortingList = useMemo(() => (['wn8', 'damage', 'winrate']), []);

  const renderButtonsWithSorting = useCallback(() => sortingList.map((sortItem: SortValue) => (
    <Button
      key={sortItem}
      theme={sortBy === sortItem ? 'default' : 'send-results'}
      onClick={() => dispatch(leaderboardActions.setSortBy(sortItem))}
    >
      {titleConfig[sortItem]}
    </Button>
  )), [sortingList, sortBy, titleConfig, dispatch]);

  const setBattlesCount = (b: number) => dispatch(leaderboardActions.setBattles(b));

  const debouncedBattlesChanger = useDebouncer(setBattlesCount, 300);

  const handleChangeBattles = (e: Event, newValue: number) => {
    // меняем значение с задержкой
    debouncedBattlesChanger(newValue);
    // видимое значение для юзера меняем моментально
    setBattlesFilter(newValue);
  };

  return (
    <>
      <SeoUpdater
        title={t('PLAYERS_PAGE_TITLE')}
        canonicalLink={`${RoutePath.rating}/?type=players`}
        description={t('PLAYERS_PAGE_DESCRIPTION')}
      />
      <section className={classNames(cls.filterSection, {}, [className])}>
        <Accordion sx={{
          background: 'var(--bg-section-with-overlay)',
          color: 'var(--primary-color)',
        }}
        >
          <AccordionSummary
            expandIcon={<FilterIcon style={{ color: 'var(--accent-color)' }} />}
            sx={{
              flexDirection: 'row-reverse', gap: '10px',
            }}
          >
            <span className={cls.accordionTitle}>
              {t('FILTERS')}
              {/* eslint-disable-next-line i18next/no-literal-string */}
              <span className={cls.arrowDown}>▼</span>
            </span>
          </AccordionSummary>
          <AccordionDetails>
            <label className={cls.filterLabel} htmlFor="battleChangeSlider">
              <span>
                {t('MIN_BATTLES_COUNT')}
              </span>
              <Slider
                id="battleChangeSlider"
                defaultValue={1000}
                min={1000}
                max={50000}
                step={100}
                value={battlesFilter}
                onChange={handleChangeBattles}
                sx={{
                  color: 'var(--accent-color)',
                  '& .MuiSlider-valueLabel': {
                    backgroundColor: 'var(--accent-color)',
                    color: 'var(--black-color)',
                  },
                }}
                aria-label={t('BATTLES_COUNT')}
                valueLabelDisplay="auto"
              />
            </label>
            <div className={cls.filterLabel}>
              <span>{t('SHOW_TOP_BY')}</span>
              <div className={cls.sortByChoose}>
                {renderButtonsWithSorting()}
              </div>
            </div>
          </AccordionDetails>
        </Accordion>
      </section>
      <Leaderboard data={ratingList} isLoading={isLoading || isFetching} />
    </>
  );
});
