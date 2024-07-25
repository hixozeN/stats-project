import React, { memo, ReactNode } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { RatingNavigation } from '../RatingNavigation/RatingNavigation';
import cls from './PlayerRatings.module.scss';

interface PlayerRatingsProps {
  className?: string;
  heading?: string;
  description?: string;
  children?: ReactNode;
}

export const PlayerRatings = memo((props: PlayerRatingsProps) => {
  const {
    className, children, heading, description,
  } = props;

  return (
    <div className={classNames(cls.PlayerRatings, {}, [className])}>
      <RatingNavigation />
      {heading && (
      <section className={cls.heading}>
        <h1 className={cls.title}>{heading}</h1>
        {description && <span className={cls.description}>{description}</span>}
      </section>
      )}
      {children}
    </div>
  );
});
