import { memo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { dataList } from 'widgets/TournamentStars/config/TournamentStarsData';
import { classNames } from 'shared/lib/classNames/classNames';
import { TournamentItem } from 'widgets/TournamentStars/ui/TournamentItem/TournamentItem';
import cls from './TournamentStars.module.scss';

interface TournamentStarsProps {
  className?: string;
}

export const TournamentStars = memo(({ className }: TournamentStarsProps) => {
  const { t } = useTranslation('main');
  return (
    <section className={classNames(cls.tournamentStars, {}, [className])}>
      <h2 className={cls.title}>{t('Звёзды RoyalCup')}</h2>
      <p className={cls.text}>
        {t('Задача организации, в особенности же новая модель организационной деятельности'
          + ' позволяет оценить значение позиций, '
          + 'занимаемых участниками в отношении поставленных задач.')}
      </p>
      <ul className={cls.table}>
        {dataList.map((data) => (
          <TournamentItem dataTeam={data} key={data._id} />
        ))}
      </ul>
    </section>
  );
});
