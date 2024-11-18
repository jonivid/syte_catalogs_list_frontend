// Utility functions for handling sessionStorage
const TOKEN_KEY = "token";

export const setToken = (token: string): void => {
  sessionStorage.setItem(TOKEN_KEY, token);
};

export const getToken = (): string | null => {
  return sessionStorage.getItem(TOKEN_KEY);
};

export const removeToken = (): void => {
  sessionStorage.removeItem(TOKEN_KEY);
};
