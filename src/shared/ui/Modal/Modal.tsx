import { classNames } from 'shared/lib/classNames/classNames';
import React, { ReactNode, useCallback, useEffect } from 'react';
import { Portal } from 'shared/ui/Portal/Portal';
import { Button } from '../Button/Button';
import cls from './Modal.module.scss';

interface IModalProps {
  className?: string;
  children?: ReactNode;
  isOpen?: boolean;
  onClose?: () => void;
  isStoryBook?: boolean;
}

export function Modal(props: IModalProps) {
  const {
    className, children, isOpen, onClose, isStoryBook = false,
  } = props;

  const mods: Record<string, boolean> = {
    [cls.opened]: isOpen,
  };

  const handleClose = useCallback(() => {
    if (onClose) onClose();
  }, [onClose]);

  const onContentClick = useCallback((e: React.MouseEvent) => {
    e.stopPropagation();
  }, []);

  const onKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      handleClose();
    }
  }, [handleClose]);

  useEffect(() => {
    if (isOpen) {
      window.addEventListener('keydown', onKeyDown);
    }

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [isOpen, onKeyDown]);

  if (isStoryBook) {
    return (
      <div className={classNames(cls.Modal, mods, [className])}>
        <div
          className={cls.overlay}
          role="button"
          tabIndex={0}
          onClick={handleClose}
        >
          <div
            className={cls.content}
            onClick={onContentClick}
            onKeyPress={() => null}
            role="button"
            tabIndex={0}
          >
            <Button
              variant="close"
              size="size_s"
              theme="clear"
              className={cls.button}
              onClick={handleClose}
            />
            {children}
            {`Very long message (close to 100 symbols) for test modal window.
          Very long message (close to 100 symbols) for test modal window.
          Very long message (close to 100 symbols) for test modal window.
          Very long message (close to 100 symbols) for test modal window.
          Very long message (close to 100 symbols) for test modal window.
          Very long message (close to 100 symbols) for test modal window.`}
          </div>
        </div>
      </div>
    );
  }

  return (
    <Portal
      element={document.getElementById('app') ?? document.body}
    >
      <div className={classNames(cls.Modal, mods, [className])}>
        <div
          className={cls.overlay}
          role="button"
          tabIndex={0}
          onClick={handleClose}
        >
          <div
            className={cls.content}
            onClick={onContentClick}
            onKeyPress={() => null}
            role="button"
            tabIndex={0}
          >
            <Button
              variant="close"
              size="size_s"
              theme="clear"
              className={cls.button}
              onClick={handleClose}
            />
            {children}
          </div>
        </div>
      </div>
    </Portal>
  );
}
