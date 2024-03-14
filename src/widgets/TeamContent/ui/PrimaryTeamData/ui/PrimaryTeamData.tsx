import { useSelector } from 'react-redux';
import { getLestaUserClanData } from 'entities/Lesta';
import { classNames } from 'shared/lib/classNames/classNames';
import { TeamAvatar } from '../../TeamAvatar/index';
import { TeamName } from '../../TeamName/index';
import { TeamDescription } from '../../TeamDescription/index';
import cls from './PrimaryTeamData.module.scss';

interface IPrimaryTeamData {
  className?: string;
}

export const PrimaryTeamData = (props: IPrimaryTeamData) => {
  const { className } = props;
  const clanData = useSelector(getLestaUserClanData);
  const description = [clanData?.motto, clanData?.description];

  if (!clanData) return null;

  return (
    <section className={classNames(cls.PrimaryTeamData, {}, [className])}>
      <TeamAvatar logo={clanData?.emblem_set_id} name={clanData?.name} />
      <TeamName name={clanData?.name} tag={clanData?.tag} />
      <TeamDescription description={description} />
    </section>
  );
};
