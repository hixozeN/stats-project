import { classNames } from 'shared/lib/classNames/classNames';
import cls from './TeamDescription.module.scss';

interface TeamDescriptionProps {
  className?: string;
  description?: string[];
}

export const TeamDescription = (props: TeamDescriptionProps) => {
  const { className, description } = props;

  return (
    <section className={classNames(cls.TeamDescription, {}, [className])}>
      {description.map((slogan: string, index) => (
        <span className={cls.slogan} key={index}>
          {slogan}
        </span>
      ))}
    </section>
  );
};
