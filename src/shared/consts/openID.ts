const clientURL = IS_DEV
  ? 'http://localhost:3000'
  : 'https://royalarena.ru';
const lestaConnectURL = IS_DEV
  ? 'http://localhost:3000/auth/connect'
  : 'https://royalarena.ru/auth/connect';
export const openIDURL = `${LESTA_AUTH_API_URL}/login/?application_id=${LESTA_APP_ID}&redirect_uri=${clientURL}`;
export const CONNECT_ID_URL = `
${LESTA_AUTH_API_URL}/login/?application_id=${LESTA_APP_ID}&redirect_uri=${lestaConnectURL}
`;
