import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { getLestaClanLogo, getLestaClanName } from 'entities/Lesta';
import cls from './TeamAvatar.module.scss';

interface TeamAvatarProps {
  className?: string;
}

export const TeamAvatar = (props: TeamAvatarProps) => {
  const { className } = props;
  const logo = useSelector(getLestaClanLogo);
  const name = useSelector(getLestaClanName);

  const renderLogo = (): string => {
    if (!logo) return '';
    return `https://wotblitz-gc.gcdn.co/icons/clanEmblems1x/clan-icon-v2-${logo}.png`;
  };

  return (
    <section className={classNames(cls.TeamAvatar, {}, [className])}>
      <img
        className={cls.logo}
        src={renderLogo()}
        alt={name}
      />
    </section>
  );
};
