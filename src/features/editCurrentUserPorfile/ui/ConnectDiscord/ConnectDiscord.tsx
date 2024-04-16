import { memo, useCallback, useEffect } from 'react';
import { classNames } from 'shared/lib/classNames/classNames';
import axios from 'axios';
import { useTranslation } from 'react-i18next';
import { useLocation } from 'react-router-dom';
import { useToasts } from 'shared/hooks/useToasts/useToasts';
import { Button } from 'shared/ui/Button/Button';
import { useAppDispatch } from 'shared/hooks/useAppDispatch/useAppDispatch';
import { patchCurrentUser } from '../../model/services/patchCurrentUser';
import cls from '../UserProfileFormInput/UserProfileFormInput.module.scss';
import { DiscordOAuth2 } from '../../model/types/DiscordOAuth2';

interface ConnectDiscordProps {
  className?: string;
  isConnected?: boolean;
}

export const ConnectDiscord = memo((props: ConnectDiscordProps) => {
  const { className, isConnected = false } = props;
  const { t } = useTranslation('profile');
  const location = useLocation();
  const { toastWithError } = useToasts();
  const dispatch = useAppDispatch();

  const parseLocationHash = useCallback((hash: string) => {
    const map: Record<string, string> = {};
    const queryPairs = hash.substring(1).split('&');

    queryPairs.forEach((item) => {
      const [query, value] = item.split('=');
      if (query && value) map[query] = value;
    });

    return map;
  }, []);

  const handleRedirectToOAuth = () => {
    const url = IS_DEV
      // eslint-disable-next-line max-len
      ? 'https://discord.com/oauth2/authorize?client_id=1052413956788080641&response_type=token&redirect_uri=https%3A%2F%2Fhixozen.ru%2Fprofile%2Fedit%2F&scope=identify'
      // ? 'https://discord.com/oauth2/authorize?client_id=1052413956788080641&response_type=token&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2Fprofile%2Fedit%2F%3F&scope=identify'
      // eslint-disable-next-line max-len
      : 'https://discord.com/oauth2/authorize?client_id=1052413956788080641&response_type=token&redirect_uri=https%3A%2F%2Froyalarena.ru%2Fprofile%2Fedit%2F&scope=identify';
      // : 'https://discord.com/oauth2/authorize?client_id=1052413956788080641&response_type=token&redirect_uri=https%3A%2F%2Fhixozen.ru%2Fprofile%2Fedit%2F&scope=identify';
    window.location.replace(url);
  };

  const handleConnectDiscord = useCallback(async (token: string, type: string) => {
    try {
      const res = await axios.get<DiscordOAuth2>('https://discord.com/api/users/@me', {
        headers: {
          authorization: `${type} ${token}`,
        },
      });

      return dispatch(patchCurrentUser({ discord: res.data.id }));
    } catch (e) {
      return toastWithError(e?.response?.data?.message || t('UNEXPECTED_ERROR'));
    }
  }, [t, toastWithError, dispatch]);

  useEffect(() => {
    if (location?.hash) {
      const querySearchParams = parseLocationHash(location.hash);
      handleConnectDiscord(querySearchParams?.access_token, querySearchParams?.token_type);
    }
  }, [location.hash, parseLocationHash, handleConnectDiscord]);

  return (
    <div className={classNames(cls.label, {}, [className])}>
      <span className={cls.span}>{t('Discord')}</span>
      {
          isConnected
            ? <span>{t('DISCORD_CONNECTED')}</span>
            : (
              <Button
                className={cls.btnConnectDiscord}
                theme="send-results"
                onClick={handleRedirectToOAuth}
              >
                {t('BTN_CONNECT_DISCORD')}
              </Button>
            )
        }
    </div>
  );
});
