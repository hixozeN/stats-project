import React, { InputHTMLAttributes, memo, useState } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import CopyIcon from 'shared/assets/icons/copy.svg';
import cls from './UserProfileFormInput.module.scss';

type HTMLInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement | HTMLTextAreaElement>,
  'value' | 'onChange' | 'readOnly'
  >;

interface IUserProfileFormInputProps extends HTMLInputProps{
  className?: string;
  value?: string;
  onChange?: (value: string) => void;
  label?: string;
  textarea?: boolean;
  readonly?: boolean;
  text?: string;
  isCopyable?: boolean;
}

export const UserProfileFormInput = memo((props: IUserProfileFormInputProps) => {
  const {
    className,
    value,
    onChange,
    label,
    textarea,
    text,
    isCopyable,
    ...otherProps
  } = props;
  const [isClicked, setClicked] = useState(false);

  const onChangeHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange?.(e.target.value);
  };

  const onChangeTextAreaHandler = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    onChange?.(e.target.value);
  };

  const handleCopy = (id: string) => {
    setClicked(true);
    navigator.clipboard.writeText(id)
      .then(() => console.log('copied'));
    setTimeout(() => setClicked(false), 1000);
  };

  const mods: Record<string, boolean> = {
    [cls.iconClicked]: isClicked,
  };

  if (text) {
    return (
      <div className={cls.label} onClick={() => handleCopy(text)}>
        <span className={cls.span}>{label}</span>
        {isCopyable && (
        <div className={cls.iconWrapper}>
          <p className={cls.text}>{text}</p>
          <CopyIcon className={classNames('', mods)} />
        </div>
        )}
        {!isCopyable && <p className={cls.text}>{text}</p>}
      </div>
    );
  }

  if (textarea) {
    return (
      <label className={cls.label} htmlFor={props.id ?? ''}>
        <span className={cls.span}>{label}</span>
        <textarea
          id={props.id ?? ''}
          value={value}
          className={classNames(cls.textarea, {}, [className])}
          onChange={onChangeTextAreaHandler}
          {...otherProps}
        />
      </label>
    );
  }

  if (label) {
    return (
      <label className={cls.label} htmlFor={props.id ?? ''}>
        <span className={cls.span}>{label}</span>
        <input
          id={props.id ?? ''}
          value={value}
          className={classNames(cls.input, {}, [className])}
          onChange={onChangeHandler}
          {...otherProps}
        />
      </label>
    );
  }

  return (
    <input
      value={value}
      type={props.type}
      className={classNames(cls.input, {}, [className])}
      onChange={onChangeHandler}
      {...otherProps}
    />
  );
});
