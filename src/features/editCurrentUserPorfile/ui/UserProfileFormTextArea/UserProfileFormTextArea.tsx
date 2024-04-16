import React, {
  ForwardedRef, forwardRef, InputHTMLAttributes, LegacyRef,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import cls from '../UserProfileFormInput/UserProfileFormInput.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLTextAreaElement>,
  'value' | 'onChange' | 'readOnly'
  >;

interface UserProfileFormTextAreaProps extends HTMLInputProps {
  className?: string;
  value?: string | number;
  label?: string;
  ref?: LegacyRef<HTMLTextAreaElement>;
}

export const UserProfileFormTextArea = forwardRef(
  (
    props: UserProfileFormTextAreaProps,
    ref: ForwardedRef<HTMLTextAreaElement>,
  ) => {
    const {
      className, id, value, label, ...otherProps
    } = props;

    return (
      <label className={cls.label} htmlFor={id ?? ''}>
        <textarea
          id={id ?? ''}
          value={value}
          className={classNames(cls.textarea, {}, [className])}
          ref={ref}
          spellCheck={false}
          {...otherProps}
        />
        <span className={cls.span}>{label}</span>
      </label>
    );
  },
);
