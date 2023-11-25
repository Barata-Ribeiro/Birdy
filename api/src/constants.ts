// ENVIRONMENT VARIABLES
export const __PROD__: boolean = process.env.NODE_ENV === "production";
export const __TEST__: boolean = process.env.NODE_ENV === "test";
export const __DEV__: boolean =
	process.env.NODE_ENV === "development" || (!__PROD__ && !__TEST__);

// CACHE VARIABLES
export const ALL_PHOTOS_CACHE_KEY = "all_photos";
export const userPhotosCacheKey = (userId: string): string =>
	`photos_user_${userId}`;

export const ALL_USERS_CACHE_KEY = "all_users";

export const ALL_FOLLOWINS_CACHE_KEY = "all_followers";
export const userFollowingCacheKey = (userId: string): string =>
	`followers_user_${userId}`;
