import { classNames } from 'shared/lib/classNames/classNames';
import cls from './ToolTip.module.scss';

interface ToolTipProps {
  text: string;
  isVisible: boolean;
}

export const ToolTip = ({ text, isVisible }: ToolTipProps) => (
  <span className={classNames(cls.tooltip, { [cls.visible]: isVisible }, [])}>
    <span className={classNames(cls.cloud)}>{text}</span>
  </span>
);
