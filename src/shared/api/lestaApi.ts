import axios from 'axios';

export const $lestaApi = axios.create({
  baseURL: LESTA_API_URL,
});
