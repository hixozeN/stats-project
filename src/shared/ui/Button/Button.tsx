import {
  ButtonHTMLAttributes, ForwardedRef, forwardRef, LegacyRef, ReactNode,
} from 'react';
import { classNames, TMods } from 'shared/lib/classNames/classNames';
import { BUTTON_ICONS } from 'shared/ui/Button/Button.icons';
import cls from './Button.module.scss';

export type ButtonVariant =
  | 'edit'
  | 'create'
  | 'join'
  | 'save'
  | 'block'
  | 'add-friend'
  | 'invite-player'
  | 'kick-player'
  | 'leave-team'
  | 'edit-logo'
  | 'disband'
  | 'send-message'
  | 'actions'
  | 'notification'
  | 'chevron-down'
  | 'magnifier'
  | 'burger'
  | 'close'
  | 'down-arrow'
  | 'sort'
  | 'filter'
  | 'star';

export type ButtonTheme =
  | 'default'
  | 'clear'
  | 'danger'
  | 'inverted' // default buttons
  | 'send-results' // 10% opacity btn
  | 'team' // gray buttons for team page
  | 'icon'
  | 'profile-icon' // small icons for header and profile
  | 'icon-right'
  | 'icon-circle'
  | 'dots'
  | 'numbers';

export type ButtonFontSize = 'font_m' | 'font_l' | 'font_xl';

export type ButtonSize =
  | 'size_s'
  | 'size_m'
  | 'size_l'
  | 'size_xl'
  | 'size_xxl';

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
  theme?: ButtonTheme;
  variant?: ButtonVariant;
  size?: ButtonSize;
  fontSize?: ButtonFontSize;
  square?: boolean;
  isLoading?: boolean;
  isUppercase?: boolean;
  children?: ReactNode;
  isActive?: boolean;
  ref?: LegacyRef<HTMLButtonElement>;
  // isActiveArrow?: boolean;
}

export const Button = forwardRef(
  (props: ButtonProps, ref: ForwardedRef<HTMLButtonElement>) => {
    const {
      className,
      isLoading,
      children,
      theme = 'default',
      variant,
      size,
      fontSize,
      square,
      isUppercase,
      isActive,
      // isActiveArrow,
      ...otherProps
    } = props;

    const isIcon = Boolean(variant);

    const mods: TMods = {
      [cls.square]: square,
      [cls.uppercase]: isUppercase,
      [cls.active]: isActive,
      // [cls.activeArrow]: isActiveArrow,
    };

    if (isLoading) {
      return (
        <button
          type="button"
          data-testid="btnWithLoader"
          ref={ref}
          className={classNames(cls.Button, mods, [
            className,
            cls[theme],
            cls[size],
            cls[fontSize],
          ])}
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
        ref={ref}
        className={classNames(cls.Button, mods, [
          className,
          cls[theme],
          cls[size],
          cls[fontSize],
        ])}
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
  },
);
