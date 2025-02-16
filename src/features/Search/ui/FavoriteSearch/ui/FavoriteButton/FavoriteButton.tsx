import React, {
  memo, useContext,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Button } from 'shared/ui/Button/Button';
import { SearchModalsContext } from '../../../Search/Search';
import cls from './FavoriteButton.module.scss';

interface FavoriteButtonProps {
  onClick?: () => void;
  className?: string;
  btnRef?: React.MutableRefObject<HTMLButtonElement>;
}

export const FavoriteButton = memo((props: FavoriteButtonProps) => {
  const { onClick, className, btnRef } = props;

  const {
    isPopoverOpen, searchType,
  } = useContext(SearchModalsContext);

  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <Button
      variant="star"
      theme="icon"
      className={classNames(cls.favBtn, { [cls.active]: searchType === 'favorites' && isPopoverOpen }, [className])}
      // onClick={handleClick}
      onMouseDown={handleClick}
      ref={btnRef}
    />
  );
});
