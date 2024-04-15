const clientURL = 'http://localhost:3000';
const lestaConnectURL = 'http://localhost:3000/auth/connect';
export const openIDURL = `${LESTA_AUTH_API_URL}/login/?application_id=${LESTA_APP_ID}&redirect_uri=${clientURL}`;
export const CONNECT_ID_URL = `
${LESTA_AUTH_API_URL}/login/?application_id=${LESTA_APP_ID}&redirect_uri=${lestaConnectURL}
`;
