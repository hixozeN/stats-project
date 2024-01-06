import { useTranslation } from 'react-i18next';
import { dataList } from 'widgets/TournamentStars/config/TournamentStarsData';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TournamentStars.module.scss';
import { TournamentStarsItem } from '../TournamentStarsItem/TournamentStarsItem';

interface TournamentStarsProps {
  className?: string;
}

export const TournamentStars = ({ className }: TournamentStarsProps) => {
  const { t } = useTranslation('main');
  return (
    <section className={classNames(cls.tournamentStars, {}, [className])}>
      <h2 className={cls.title}>{t('Звёзды RoyalCup')}</h2>
      <p className={cls.text}>
        {t(
          'Задача организации, в особенности же новая модель организационной деятельности'
            + ' позволяет оценить значение позиций, '
            + 'занимаемых участниками в отношении поставленных задач.',
        )}
      </p>
      <ul className={cls.table}>
        {dataList.map((data) => (
          <TournamentStarsItem dataTeam={data} key={data._id} />
        ))}
      </ul>
    </section>
  );
};
