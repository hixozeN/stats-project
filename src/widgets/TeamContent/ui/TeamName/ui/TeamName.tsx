import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TeamName.module.scss';

interface TeamNameProps {
  className?: string;
  name: string;
  tag: string;
}

export const TeamName = (props: TeamNameProps) => {
  const { className, name, tag } = props;

  return (
    <section className={classNames(cls.TeamName, {}, [className])}>
      <span className={cls.text}>{name}</span>
      <span className={cls.text}>{`[${tag}]`}</span>
    </section>
  );
};
