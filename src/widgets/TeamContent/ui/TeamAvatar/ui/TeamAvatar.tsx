import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TeamAvatar.module.scss';

interface TeamAvatarProps {
  className?: string;
  logo: number;
  name: string;
}

export const TeamAvatar = (props: TeamAvatarProps) => {
  const { className, logo, name } = props;

  return (
    <section className={classNames(cls.TeamAvatar, {}, [className])}>
      <img
        className={cls.logo}
        src={`https://wotblitz-gc.gcdn.co/icons/clanEmblems1x/clan-icon-v2-${logo}.png`}
        alt={name}
      />
    </section>
  );
};
