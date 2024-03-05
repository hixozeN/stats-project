import { memo, ReactElement, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { getLestaUserRatingData } from 'entities/Lesta';
import img from 'shared/assets/images/userStats/rating_calibration.webp';
import bronzeShield from 'shared/assets/images/userStats/rating_bronze.png';
import silverShield from 'shared/assets/images/userStats/rating_silver.png';
import goldShield from 'shared/assets/images/userStats/rating_gold.png';
import platinumShield from 'shared/assets/images/userStats/rating_platinum.png';
import brilliantShield from 'shared/assets/images/userStats/rating_brilliant.png';
import { useTranslation } from 'react-i18next';
import { useSelector } from 'react-redux';
import cls from './UserRating.module.scss';

interface UserRatingProps {
  className?: string;
}

export const UserRating = memo((props: UserRatingProps) => {
  const { className } = props;
  const { t } = useTranslation();
  const ratingData = useSelector(getLestaUserRatingData);

  const ratingValue = Math.round(10 * (ratingData?.mm_rating || 0) + 3e3);

  const renderRatingShield = useCallback((rating: number) => {
    const shields: Record<number, ReactElement> = {
      4000: platinumShield,
      3000: goldShield,
      2000: silverShield,
    };

    if (rating >= 5000) return brilliantShield;

    const roundedRating = Math.round(rating / 1000) * 1000;

    return roundedRating ? shields[roundedRating] : bronzeShield;
  }, []);

  if (!ratingData) return null;

  if (ratingData?.battles === 0) {
    return (
      <div className={classNames(cls.rating, {}, [className])}>
        <img
          className={cls.ratingImage}
          src={img}
          alt={t('Изображение лиги пользователя в виде цветного щита')}
          loading="lazy"
        />
        <span className={cls.ratingValue}>0 / 10</span>
      </div>
    );
  }

  if (ratingData?.calibration_battles_left !== 0) {
    return (
      <div className={classNames(cls.rating, {}, [className])}>
        <img
          className={cls.ratingImage}
          src={img}
          alt={t('Изображение лиги пользователя в виде цветного щита')}
          loading="lazy"
        />
        <span className={cls.ratingValue}>
          {`${10 - ratingData.calibration_battles_left} / 10`}
        </span>
      </div>
    );
  }

  return (
    <div className={classNames(cls.rating, {}, [className, cls.ratingGap])}>
      <img
        className={cls.ratingImage}
        src={renderRatingShield(ratingValue)}
        alt={t('Изображение лиги пользователя в виде цветного щита')}
        loading="lazy"
      />
      <span className={cls.ratingValue}>{ratingValue}</span>
    </div>
  );
});
