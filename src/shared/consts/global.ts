export const SERVER_ERROR_MESSAGE = 'Проблема соединения. Попробуйте позже.';
export const LESTA_TOKEN_INTERCEPTOR_RESPONSE = {
  response: {
    status: 205,
    data: {
      message: 'Что-то пошло не так... но мы все починили!👍',
    },
  },
};
export const PRODUCTION_URL = 'https://blitzstats.ru';
export const DEV_URL = 'http://localhost:3000';
export const AUTH_REDIRECT_URL = `${IS_DEV ? DEV_URL : PRODUCTION_URL}/auth/lesta/result/`;
export const DEFAULT_USER_AVATAR = 'https://i.ibb.co/6mFMhKT/default-avatar2.jpg';
export const REGEX_SYMBOLS_FILTER = /[!@#$()«»%^&{}:;\\\-_,."`'\s]/g;
