import { useSelector } from 'react-redux';
import { classNames } from 'shared/lib/classNames/classNames';
import { getLestaClanDescription, getLestaClanMotto } from 'entities/Lesta';
import cls from './TeamDescription.module.scss';

interface TeamDescriptionProps {
  className?: string;
}

export const TeamDescription = (props: TeamDescriptionProps) => {
  const { className } = props;
  const description = useSelector(getLestaClanDescription);
  const motto = useSelector(getLestaClanMotto);

  return (
    <section className={classNames(cls.TeamDescription, {}, [className])}>
      <span className={cls.slogan}>
        {motto}
      </span>
      <span className={cls.slogan}>
        {description}
      </span>
    </section>
  );
};
