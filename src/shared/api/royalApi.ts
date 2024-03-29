import axios from 'axios';

export const $royalApi = axios.create({
  baseURL: ROYAL_ARENA_API_URL,
  withCredentials: true,
});
