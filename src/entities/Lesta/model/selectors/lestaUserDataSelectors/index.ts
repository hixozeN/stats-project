import { StateSchema } from 'app/providers/StoreProvider';

// статусные селекторы
export const getUserDataLoadingStatus = (state: StateSchema) => state?.lestaUserData?.isLoading || false;
export const getUserDataErrorStatus = (state: StateSchema) => state?.lestaUserData?.error || '';
export const getUserNotFoundStatus = (state: StateSchema) => state?.lestaUserData?.isNotFound || false;

// основные данные пользователя
export const getUserId = (state: StateSchema) => state?.lestaUserData?.personal?.id || '';
export const getUserNickname = (state: StateSchema) => state?.lestaUserData?.personal?.lestaData?.nickname || '';
export const getUserAvatar = (state: StateSchema) => state?.lestaUserData?.personal?.avatar
  || 'https://i.ibb.co/6mFMhKT/default-avatar2.jpg';
export const getUserBio = (state: StateSchema) => state?.lestaUserData?.personal?.bio
  || null;
export const getUserTelegram = (state: StateSchema) => state?.lestaUserData?.personal?.telegram || null;
export const getUserDiscord = (state: StateSchema) => state?.lestaUserData?.personal?.discord || null;
export const getUserVK = (state: StateSchema) => state?.lestaUserData?.personal?.vk || null;
export const getUserYouTube = (state: StateSchema) => state?.lestaUserData?.personal?.youtube || null;
export const getUserSocialLinks = (state: StateSchema) => ({
  vk: state?.lestaUserData?.personal?.vk || null,
  discord: state?.lestaUserData?.personal?.discord || null,
  telegram: state?.lestaUserData?.personal?.telegram || null,
  youtube: state?.lestaUserData?.personal?.youtube || null,
});
export const getUserClanData = (state: StateSchema) => state?.lestaUserData?.clan || null;
export const getUserClanLoadingStatus = (state: StateSchema) => state?.lestaUserData?.isClanLoading || false;
export const getUserPrivateData = (state: StateSchema) => state?.lestaUserData?.private || null;
export const getUserBanStatus = (state: StateSchema) => state?.lestaUserData?.personal?.block?.isBanned || false;
export const getUserBanMessage = (state: StateSchema) => state?.lestaUserData?.personal?.block?.message || null;
export const getUserStatus = (state: StateSchema) => state?.lestaUserData?.personal?.isOnline || false;

// лестовские данные
export const getUserLestaId = (state: StateSchema) => state?.lestaUserData?.personal?.lestaData?.account_id || null;

// основная статистика
export const getUserStats = (state: StateSchema) => state?.lestaUserData?.statistics || null;

// рейтинговые показатели
export const getUserRatingStats = (state: StateSchema) => state?.lestaUserData?.rating || null;
export const getUserRatingValues = (state: StateSchema) => state?.lestaUserData?.ratingValues || null;

// сессии
export const getUserLastSessionId = (state: StateSchema) => {
  if (state?.lestaUserData?.personal?.sessions?.length > 0) {
    return [...state.lestaUserData.personal.sessions].pop().id;
  }
  return null;
};
export const getUserSessions = (state: StateSchema) => state?.lestaUserData?.personal?.sessions || [];
