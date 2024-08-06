import { useCallback, useState } from 'react';
import { useSelector } from 'react-redux';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { getQueryParams } from 'shared/lib/url/addQueryParams/addQueryParams';
import { Color } from 'antd/es/color-picker/index';
import { useSearchParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { TUserSession } from 'entities/Lesta';
import {
  BattleType, WidgetElements, WidgetParams, WidgetTheme,
} from '../../model/types/SessionWidgetSchema';
import { defaultBattleTypeElements } from '../../model/consts/sessionWidgetConsts';
import { SessionWidgetActions } from '../../model/slices/SessionWidgetSlice';
import {
  getWidgetBackground,
  getWidgetBattleType,
  getWidgetElementBg,
  getWidgetElements,
  getWidgetFontColor,
  getWidgetOutlineColor,
  getWidgetSessionId,
  getWidgetTheme,
  getWidgetTitleColor,
} from '../../model/selectors';

interface HookProps {
  currentPlayerId?: number;
  data?: TUserSession;
}

export const useSessionWidget = (props?: HookProps) => {
  const { data = null, currentPlayerId } = props;
  const dispatch = useAppDispatch();
  const { t } = useTranslation('widgets');
  const [searchParams] = useSearchParams();
  const [isFormDirty, setIsFormDirty] = useState(true);

  const setFormDirty = useCallback(() => {
    setIsFormDirty(true);
  }, []);

  const setFormClean = useCallback(() => {
    setIsFormDirty(false);
  }, []);

  const sessionId = useSelector(getWidgetSessionId);
  const battleType = useSelector(getWidgetBattleType);
  const elements = useSelector(getWidgetElements);
  const widgetTheme = useSelector(getWidgetTheme);
  const fontColor = useSelector(getWidgetFontColor);
  const titleColor = useSelector(getWidgetTitleColor);
  const bg = useSelector(getWidgetBackground);
  const elementBg = useSelector(getWidgetElementBg);
  const outlineColor = useSelector(getWidgetOutlineColor);

  const paramsData: OptionalRecord<WidgetParams, string> = {
    [WidgetParams.THEME]: searchParams.get(WidgetParams.THEME) ?? widgetTheme,
    [WidgetParams.ELEMENTS]: searchParams.get(WidgetParams.ELEMENTS) ?? elements.join(','),
    [WidgetParams.FONT_COLOR]: searchParams.get(WidgetParams.FONT_COLOR) ?? fontColor,
    [WidgetParams.TITLE_COLOR]: searchParams.get(WidgetParams.TITLE_COLOR) ?? titleColor,
    [WidgetParams.BG]: searchParams.get(WidgetParams.BG) ?? bg,
    [WidgetParams.ELEMENT_BG]: searchParams.get(WidgetParams.ELEMENT_BG) ?? elementBg,
    [WidgetParams.OUTLINE_COLOR]: searchParams.get(WidgetParams.OUTLINE_COLOR) ?? outlineColor,
  };

  const elementTitles: OptionalRecord<WidgetElements, string> = {
    [WidgetElements.BATTLES]: t('BATTLES'),
    [WidgetElements.RATING_BATTLES]: t('BATTLES'),
    [WidgetElements.WN8]: t('WN8'),
    [WidgetElements.RATING_DMG]: t('AVG_DMG'),
    [WidgetElements.AVG_DMG]: t('AVG_DMG'),
    [WidgetElements.CURRENT_RATING]: t('RATING'),
    [WidgetElements.WIN_RATE]: t('WINRATE'),
    [WidgetElements.RATING_WR]: t('WINRATE'),
  };

  const elementPreviewValues: OptionalRecord<WidgetElements, number | string> = {
    [WidgetElements.BATTLES]: data?.statistics?.battles ?? 123,
    [WidgetElements.RATING_BATTLES]: data?.rating?.battles ?? 15,
    [WidgetElements.WN8]: data?.statistics?.wn8 ?? 3726,
    [WidgetElements.RATING_DMG]: data?.rating?.currentRatingAvgDmg ?? 3106,
    [WidgetElements.AVG_DMG]: data?.statistics?.avgDamage ?? 3224,
    [WidgetElements.CURRENT_RATING]: data?.rating?.currentRating ?? 5337,
    [WidgetElements.WIN_RATE]: data?.statistics?.winRate ?? 80.21,
    [WidgetElements.RATING_WR]: data?.rating?.currentRatingWinrate ?? 62.19,
  };

  const handleChangeElements = useCallback((arr: WidgetElements[]) => {
    setFormDirty();
    dispatch(SessionWidgetActions.setElements(arr));
  }, [dispatch, setFormDirty]);

  const handleChangeBattleType = useCallback((type: BattleType) => {
    setFormDirty();
    dispatch(SessionWidgetActions.setBattleType(type));
    dispatch(SessionWidgetActions.setElements(defaultBattleTypeElements[type]));
  }, [dispatch, setFormDirty]);

  const handleChangeWidgetTheme = useCallback((theme: WidgetTheme) => {
    setFormDirty();
    dispatch(SessionWidgetActions.setWidgetTheme(theme));
  }, [dispatch, setFormDirty]);

  const handleChangeFontColor = useCallback((c: Color) => {
    setFormDirty();
    dispatch(SessionWidgetActions.setFontColor(c.toHexString()));
  }, [dispatch, setFormDirty]);

  const handleChangeTitleColor = useCallback((c: Color) => {
    setFormDirty();
    dispatch(SessionWidgetActions.setTitleColor(c.toHexString()));
  }, [dispatch, setFormDirty]);

  const handleChangeBgColor = useCallback((c: Color) => {
    setFormDirty();
    dispatch(SessionWidgetActions.setBgColor(c.toHexString()));
  }, [dispatch, setFormDirty]);

  const handleChangeElementBgColor = useCallback((c: Color) => {
    setFormDirty();
    dispatch(SessionWidgetActions.setElementBgColor(c.toHexString()));
  }, [dispatch, setFormDirty]);

  const handleChangeOutlineColor = useCallback((c: Color) => {
    setFormDirty();
    dispatch(SessionWidgetActions.setOutlineColor(c.toHexString()));
  }, [dispatch, setFormDirty]);

  const getWidgetParams = useCallback((newSessionId: string): string => {
    const paramObj: OptionalRecord<WidgetParams, string> = {
      [WidgetParams.ACCOUNT_ID]: String(currentPlayerId),
      [WidgetParams.SESSION_ID]: newSessionId,
      [WidgetParams.BATTLE_TYPE]: battleType,
      [WidgetParams.ELEMENTS]: elements.join(','),
      [WidgetParams.THEME]: widgetTheme,
      [WidgetParams.FONT_COLOR]: fontColor,
      [WidgetParams.TITLE_COLOR]: titleColor,
      [WidgetParams.BG]: bg,
      [WidgetParams.ELEMENT_BG]: elementBg,
      [WidgetParams.OUTLINE_COLOR]: outlineColor,
    };

    return getQueryParams(paramObj);
  }, [
    currentPlayerId, battleType, bg, elementBg, elements, fontColor, outlineColor, titleColor, widgetTheme,
  ]);

  return {
    sessionId,
    battleType,
    bg,
    elementBg,
    elements,
    fontColor,
    outlineColor,
    titleColor,
    widgetTheme,
    paramsData,
    elementTitles,
    elementPreviewValues,
    handleChangeElements,
    handleChangeBattleType,
    handleChangeWidgetTheme,
    handleChangeFontColor,
    handleChangeTitleColor,
    handleChangeBgColor,
    handleChangeElementBgColor,
    handleChangeOutlineColor,
    getWidgetParams,
    isFormDirty,
    setFormClean,
  };
};
