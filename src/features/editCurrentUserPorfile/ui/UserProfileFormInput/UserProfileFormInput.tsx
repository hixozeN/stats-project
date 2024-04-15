import React, {
  forwardRef, InputHTMLAttributes, LegacyRef, useMemo, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy.svg';
import { useTranslation } from 'react-i18next';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import cls from './UserProfileFormInput.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'value' | 'onChange' | 'readOnly'
  >;

interface IUserProfileFormInputProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  readonly?: boolean;
  text?: string | number;
  isCopyable?: boolean;
  isError?: boolean;
  isDirty?: boolean;
  ref?: LegacyRef<HTMLInputElement>;
}

export const UserProfileFormInput = forwardRef(
  (
    props: IUserProfileFormInputProps,
    ref: LegacyRef<HTMLInputElement>,
  ) => {
    const {
      className,
      value,
      label,
      text,
      isCopyable,
      isError,
      isDirty,
      ...otherProps
    } = props;
    const [isClicked, setClicked] = useState(false);
    const { t } = useTranslation('profile');
    const { toastSuccess } = useToasts();

    const handleCopy = (id: number | string) => {
      setClicked(true);
      navigator.clipboard.writeText(typeof id === 'number' ? id.toString() : id)
        .then(() => toastSuccess(t('ID_COPIED')));
      setTimeout(() => setClicked(false), 1000);
    };

    const mods: Record<string, boolean> = {
      [cls.iconClicked]: isClicked,
    };

    const inputValidationMods = useMemo(
      () => ({ [cls.error]: isError, [cls.correctValue]: !isError && isDirty }),
      [isError, isDirty],
    );

    if (text) {
      return (
        <div className={cls.label}>
          <span className={cls.span}>{label}</span>
          {isCopyable && (
          <div className={cls.idWrapper} onClick={() => handleCopy(text)}>
            <p className={cls.text}>{text}</p>
            <div className={cls.iconWrapper}>
              <CopyIcon className={classNames('', mods)} />
              {/* <div className={classNames(cls.popup, { [cls.popupActive]: isClicked })}> */}
              {/*  <span className={cls.popupText}>{t('Скопировано!')}</span> */}
              {/* </div> */}
            </div>
          </div>
          )}
          {!isCopyable && <p className={cls.text}>{text}</p>}
        </div>
      );
    }

    if (label) {
      return (
        <label className={cls.label} htmlFor={props.id ?? ''}>
          <input
            id={props.id ?? ''}
            value={value}
            className={classNames(cls.input, inputValidationMods, [className])}
            ref={ref}
            {...otherProps}
          />
          <span className={cls.span}>{label}</span>
        </label>
      );
    }

    return (
      <input
        id={props.id}
        value={value}
        type={props.type}
        className={classNames(cls.input, inputValidationMods, [className])}
        ref={ref}
        {...otherProps}
      />
    );
  },
);
