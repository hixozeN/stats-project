import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ToolTip.module.scss';

interface ToolTipProps {
  className?: string;
  text: string;
  isVisible: boolean;
}

export const ToolTip = ({ className, text, isVisible }: ToolTipProps) => (
  <span className={classNames(cls.tooltip, { [cls.visible]: isVisible }, [className])}>
    <span className={classNames(cls.cloud)}>{text}</span>
  </span>
);
