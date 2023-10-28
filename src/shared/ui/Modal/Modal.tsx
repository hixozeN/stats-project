import { classNames } from 'shared/lib/classNames/classNames';
import React, { ReactNode } from 'react';
import cls from './Modal.module.scss';

interface IModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
}

export function Modal(props: IModalProps) {
  const {
    className, children, isOpen, onClose,
  } = props;

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
  };

  const handleClose = () => {
    if (onClose) onClose();
  };

  const onContentClick = (e: React.MouseEvent) => {
    e.stopPropagation();
  };

  return (
    <div className={classNames(cls.Modal, mods, [className])}>
      <div className={cls.overlay} role="button" tabIndex={0} onClick={handleClose}>
        <div className={cls.content} onClick={onContentClick}>
          {children}
          {`Porttitor omnesque natoque nullam mediocrem eam aliquid appareat.
          Neque postulant scripserit qui maecenas adolescens habemus mei.
          Ancillae sententiae quam mucius libris oporteat.
          Quaerendum torquent definitiones mnesarchum luctus quidam nibh maecenas
          conclusionemque volumus.
          Doming epicuri reprimique inimicus at quisque est.`}
        </div>
      </div>
    </div>
  );
}
