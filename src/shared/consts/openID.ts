import { AUTH_REDIRECT_URL, PRODUCTION_URL } from 'shared/consts/global';

const lestaConnectURL = IS_DEV
  ? 'http://localhost:3000/auth/connect'
  : `${PRODUCTION_URL}/auth/connect`;
const APP_ID = IS_DEV ? LESTA_DEV_APP_ID : LESTA_APP_ID;
export const openIDURL = `${LESTA_AUTH_API_URL}/login/?application_id=${APP_ID}&redirect_uri=${AUTH_REDIRECT_URL}`;
export const CONNECT_ID_URL = `${LESTA_AUTH_API_URL}/login/?application_id=${APP_ID}&redirect_uri=${lestaConnectURL}`;
