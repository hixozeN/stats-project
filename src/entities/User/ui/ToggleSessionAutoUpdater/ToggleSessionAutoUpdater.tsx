import React, { memo, useCallback } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { Checkbox, CheckboxProps } from 'antd';
import { BTooltip } from 'shared/ui/BTooltip/BTooltip';
import QuestionIcon from 'shared/assets/icons/questionForTooltip.svg';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import { useSelector } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { getCurrentUserSettings } from '../../model/selectors';
import { useToggleUpdateAutoUpdateSessionMutation } from '../../api/toggleAutoUpdateSessionSetting';
import { userActions } from '../../model/slice/userSlice';
import cls from './ToggleSessionAutoUpdater.module.scss';

interface ToggleSessionAutoUpdaterProps {
  className?: string;
}

export const ToggleSessionAutoUpdater = memo((props: ToggleSessionAutoUpdaterProps) => {
  const { className } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const { toastSuccess, toastWithError } = useToasts();

  // Session Auto Update mutation
  const { shouldAutoUpdateSession = false } = useSelector(getCurrentUserSettings);
  const [toggleSessionAutoUpdate, { isLoading }] = useToggleUpdateAutoUpdateSessionMutation();

  const onCheckboxChange: CheckboxProps['onChange'] = useCallback((e) => {
    if (isLoading) return;

    const { checked } = e.target;

    toggleSessionAutoUpdate({ shouldAutoUpdateSession: checked })
      .unwrap()
      .then(() => {
        toastSuccess(t(checked ? 'TOAST_AUTO_UPDATE_SUCCESS_TRUE' : 'TOAST_AUTO_UPDATE_SUCCESS_FALSE'));
        dispatch(userActions.toggleAutoUpdateSessionSetting(checked));
      })
      .catch(() => toastWithError(t('TOAST_AUTO_UPDATE_ERROR')));
  }, [isLoading, toggleSessionAutoUpdate, toastSuccess, t, dispatch, toastWithError]);

  return (
    <div className={classNames(cls.checkboxWrapper, {}, [className])}>
      <Checkbox checked={shouldAutoUpdateSession} onChange={onCheckboxChange}>
        {t('AUTO_UPDATE_CHECKBOX_LABEL')}
      </Checkbox>
      <BTooltip
        title={t('TOOLTIP_SESSIONS_AUTO_UPDATER')}
        underlinePosition="none"
        className={cls.tooltip}
      >
        <QuestionIcon className={cls.tooltipIcon} />
      </BTooltip>
    </div>
  );
});
