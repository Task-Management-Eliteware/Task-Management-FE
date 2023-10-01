type TSetLocalStorage = {
  key: string;
  value: unknown;
};

export const localStorageSetItem = (args: TSetLocalStorage) => {
  const { key, value } = args;
  localStorage.setItem(key, value as string);
};

export const localStorageGetItem = (key: string) => {
  const value = localStorage.getItem(key);
  return value;
};
