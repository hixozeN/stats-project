import { memo } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ErrorBoundary } from 'app/providers/ErrorBoundary/index';
import { SeoUpdater } from 'shared/lib/SeoUpdater/SeoUpdater';
import { Background } from 'shared/ui/Background/Background';
import { LeaderboardWithSorting } from 'features/playersLeaderboard';
import { useTranslation } from 'react-i18next';
import cls from './RatingPage.module.scss';

interface RatingPageProps {
  className?: string;
}

const RatingPage = memo((props: RatingPageProps) => {
  const { className } = props;
  const { t } = useTranslation('rating');

  return (
    <ErrorBoundary>
      <SeoUpdater title={t('PAGE_TITLE')} />
      <Background />
      <div className={classNames(cls.RatingPage, {}, [className])}>
        <div className={cls.wrapper}>
          <LeaderboardWithSorting />
        </div>
      </div>
    </ErrorBoundary>
  );
});

export default RatingPage;
