import { useCallback, useEffect, useState } from 'react';
import { classNames } from '../../lib/classNames/classNames';
import { Button } from '../Button/Button';
import cls from './BackToTopButton.module.scss';

interface BackToTopButtonProps {
  className?: string,
}

export const BackToTopButton = (props: BackToTopButtonProps) => {
  const { className } = props;
  const [isVisible, setIsVisible] = useState(false);

  const scrollToTop = useCallback(() => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    isVisible
      ? (
        <Button
          className={classNames(cls.BackToTopButton, {}, [className])}
          theme="icon"
          variant="down-arrow"
          onClick={scrollToTop}
        />
      ) : null
  );
};
