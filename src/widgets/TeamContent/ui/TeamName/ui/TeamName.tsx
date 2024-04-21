import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { getLestaClanName, getLestaClanTag } from 'entities/Lesta';
import cls from './TeamName.module.scss';

interface TeamNameProps {
  className?: string;
}

export const TeamName = (props: TeamNameProps) => {
  const { className } = props;
  const name = useSelector(getLestaClanName);
  const tag = useSelector(getLestaClanTag);

  return (
    <section className={classNames(cls.TeamName, {}, [className])}>
      <span className={cls.text}>{name}</span>
      <span className={cls.text}>{`[${tag}]`}</span>
    </section>
  );
};
