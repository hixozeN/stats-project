import { ButtonHTMLAttributes, FC } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { BUTTON_ICONS } from 'shared/ui/Button/Button.icons';
import cls from './Button.module.scss';

export type ButtonVariant = 'edit' | 'create' | 'join' | 'save' | 'block' | 'add-friend'
  | 'invite-player' | 'kick-player' | 'leave-team' | 'edit-logo' | 'disband'
  | 'send-message' | 'actions' | 'notification' | 'chevron-down' | 'magnifier' | 'burger';

export type ButtonTheme = 'default' | 'clear' | 'danger' | 'inverted' // default buttons
  | 'send-results' // 10% opacity btn
  | 'team' // gray buttons for team page
  | 'icon' | 'profile-icon' // small icons for header and profile
  | 'icon-right' | 'icon-circle';

export type ButtonFontSize = 'font_m' | 'font_l' | 'font_xl';

export type ButtonSize = 'size_s' | 'size_m' | 'size_l' | 'size_xl' | 'size_xxl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fontSize?: ButtonFontSize;
  square?: boolean;
  isLoading?: boolean;
}

export const Button: FC<ButtonProps> = (props) => {
  const {
    className,
    isLoading,
    children,
    theme = 'default',
    variant,
    size,
    fontSize,
    square,
    ...otherProps
  } = props;

  const isIcon = Boolean(variant);

  const mods: Record<string, boolean> = {
    [cls.square]: square,
  };

  if (isLoading) {
    return (
      <button
        type="button"
        data-testid="btnWithLoader"
        className={classNames(cls.Button, mods, [className, cls[theme], cls[size], cls[fontSize]])}
        {...otherProps}
      >
        <span data-testid="spanWithLoader" className={cls.loader} />
      </button>
    );
  }

  return (
    <button
      type="button"
      data-testid="btnUiKit"
      className={classNames(cls.Button, mods, [className, cls[theme], cls[size], cls[fontSize]])}
      {...otherProps}
    >
      {isIcon && (
        <span data-testid="btnIcon" className={classNames(cls.iconSpan)}>
          {BUTTON_ICONS[variant]}
        </span>
      )}
      {children}
    </button>
  );
};
