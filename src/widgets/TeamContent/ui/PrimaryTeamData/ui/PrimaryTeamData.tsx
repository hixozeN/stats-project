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

  return (
    <section className={classNames(cls.PrimaryTeamData, {}, [className])}>
      <div className={cls.container}>
        <TeamAvatar />
        <TeamName />
      </div>
      <TeamDescription />
    </section>
  );
};
