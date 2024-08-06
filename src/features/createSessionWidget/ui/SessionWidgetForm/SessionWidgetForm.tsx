import {
  FormEvent, memo, useCallback, useState,
} from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import { ColorPicker } from 'antd';
import { AntSelect } from 'shared/ui/Select/Select';
import { useTranslation } from 'react-i18next';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { useSelector } from 'react-redux';
import { Button } from 'shared/ui/Button/Button';
import { getCurrentUserAccountId } from 'entities/User';
import { createLestaUserSession } from 'entities/Lesta/index';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import { SessionWidgetActions } from '../../model/slices/SessionWidgetSlice';
import { useSessionWidget } from '../../lib/hooks/useSessionWidget';
import {
  battleTypeOptions, randomBattlesOptions, ratingBattlesOptions,
  themeOptions,
} from '../../model/consts/sessionWidgetConsts';
import {
  BattleType,
  WidgetTheme,
} from '../../model/types/SessionWidgetSchema';
import {
  SessionWidgetPreview,
} from '../SessionWidgetPreview/SessionWidgetPreview';
import cls from './SessionWidgetForm.module.scss';

interface SessionWidgetFormProps {
  className?: string;
}

export const SessionWidgetForm = memo((props: SessionWidgetFormProps) => {
  const { className } = props;
  const { t } = useTranslation('widgets');
  const [widgetUrl, setWidgetUrl] = useState<string>('');
  const [isCreatingWidget, setIsCreatingWidget] = useState(false);
  const dispatch = useAppDispatch();
  const {
    toastSuccess,
    toastWithError,
  } = useToasts();

  const currentPlayerId = useSelector(getCurrentUserAccountId);

  const {
    battleType,
    bg,
    elementBg,
    fontColor,
    outlineColor,
    titleColor,
    widgetTheme,
    handleChangeElements,
    handleChangeBattleType,
    handleChangeWidgetTheme,
    handleChangeFontColor,
    handleChangeTitleColor,
    handleChangeBgColor,
    handleChangeElementBgColor,
    handleChangeOutlineColor,
    getWidgetParams,
    setFormClean,
    isFormDirty,
  } = useSessionWidget({ currentPlayerId });

  const handleCopy = () => {
    navigator.clipboard.writeText(widgetUrl)
      .then(() => toastSuccess(t('URL_COPIED')));
  };

  const handleSubmit = useCallback(async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsCreatingWidget(true);
    await dispatch(createLestaUserSession())
      .unwrap()
      .then((res) => {
        const newSessionId = [...res].pop().id;
        dispatch(SessionWidgetActions.setSessionId(newSessionId));

        const params = getWidgetParams(newSessionId);
        setWidgetUrl(`https://blitzstats.ru/widgets/session/${params}`);
        setFormClean();

        navigator.clipboard.writeText(`https://blitzstats.ru/widgets/session/${params}`);

        toastSuccess(t('CREATE_WIDGET_SUCCESS'));
      })
      .catch(() => {
        toastWithError(t('CREATE_WIDGET_ERROR'));
      })
      .finally(() => setIsCreatingWidget(false));
  }, [dispatch, getWidgetParams, toastSuccess, toastWithError, t, setFormClean]);

  return (
    <form
      className={classNames(cls.widgetSettingsForm, {}, [className])}
      onSubmit={handleSubmit}
    >
      <h2 className={cls.formTitle}>{t('SESSION_WIDGET_FORM_TITLE')}</h2>
      <label className={cls.label} htmlFor="battleTypeSelect">
        <span className={cls.labelName}>{t('LABEL_BATTLE_TYPE')}</span>
        <AntSelect
          id="battleTypeSelect"
          defaultValue={battleType}
          options={battleTypeOptions}
          selectStyle={cls.select}
          onChange={handleChangeBattleType}
          value={battleType}
        />
      </label>
      <label className={cls.label} htmlFor="widgetThemeSelect">
        <span className={cls.labelName}>{t('LABEL_WIDGET_THEME')}</span>
        <AntSelect
          id="widgetThemeSelect"
          defaultValue={widgetTheme}
          selectStyle={cls.select}
          popupStyle={cls.dropdown}
          showSearch={false}
          options={themeOptions}
          onChange={handleChangeWidgetTheme}
        />
      </label>
      <label className={cls.label} htmlFor="widgetElementsSelect">
        <span className={cls.labelName}>{t('LABEL_ELEMENTS')}</span>
        {
          battleType === BattleType.RANDOM
            && (
              <AntSelect
                id="widgetElementsSelect"
                mode="multiple"
                maxTagCount="responsive"
                showSearch={false}
                selectStyle={cls.select}
                popupStyle={cls.dropdown}
                placeholder={t('ELEMENTS_SELECT_PLACEHOLDER')}
                defaultValue={randomBattlesOptions.map(({ value }) => value)}
                onChange={handleChangeElements}
                options={randomBattlesOptions}
              />
            )
        }
        {
          battleType === BattleType.RATING
            && (
            <AntSelect
              id="widgetElementsSelect"
              mode="multiple"
              maxTagCount="responsive"
              showSearch={false}
              selectStyle={cls.select}
              popupStyle={cls.dropdown}
              placeholder={t('ELEMENTS_SELECT_PLACEHOLDER')}
              defaultValue={ratingBattlesOptions.map(({ value }) => value)}
              onChange={handleChangeElements}
              options={ratingBattlesOptions}
            />
            )
        }
      </label>
      <div className={cls.label}>
        <span className={cls.labelName}>{t('LABEL_TITLE_COLOR')}</span>
        <ColorPicker
          rootClassName={cls.colorPicker}
          defaultValue={titleColor}
          value={titleColor}
          allowClear
          onChange={handleChangeTitleColor}
        />
      </div>
      <div className={cls.label}>
        <span className={cls.labelName}>{t('LABEL_FONT_COLOR')}</span>
        <ColorPicker
          rootClassName={cls.colorPicker}
          defaultValue={fontColor}
          value={fontColor}
          allowClear
          onChange={handleChangeFontColor}
        />
      </div>
      <div className={cls.label}>
        <span className={cls.labelName}>{t('LABEL_BACKGROUND')}</span>
        <ColorPicker
          rootClassName={cls.colorPicker}
          defaultValue={bg}
          value={bg}
          allowClear
          onChange={handleChangeBgColor}
        />
      </div>
      {
        (widgetTheme === WidgetTheme.TILE_ROW
        || widgetTheme === WidgetTheme.TILE_COLUMN)
        && (
          <>
            <div className={cls.label}>
              <span className={cls.labelName}>{t('LABEL_BACKGROUND_ELEMENTS')}</span>
              <ColorPicker
                rootClassName={cls.colorPicker}
                defaultValue={elementBg}
                value={elementBg}
                allowClear
                onChange={handleChangeElementBgColor}
              />
            </div>
            <div className={cls.label}>
              <span className={cls.labelName}>{t('LABEL_OUTLINE_COLOR')}</span>
              <ColorPicker
                rootClassName={cls.colorPicker}
                defaultValue={outlineColor}
                value={outlineColor}
                allowClear
                onChange={handleChangeOutlineColor}
              />
            </div>
          </>
        )
      }
      <SessionWidgetPreview theme={widgetTheme} />
      <div className={cls.finalWidgetUrlWrapper}>
        {!isFormDirty && <span className={cls.finalWidgetUrl} onClick={handleCopy}>{widgetUrl}</span>}
      </div>
      <Button type="submit" className={cls.button} isLoading={isCreatingWidget}>
        {t('CREATE_WIDGET')}
      </Button>
    </form>
  );
});
