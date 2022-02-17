import { detectBrowser } from './detectBrowser';

export const get = (
  keys: string | string[],
  callback: (items: { [key: string]: any }) => void
): void => {
  const browserName = detectBrowser();
  if (browserName === 'chrome') {
    return chrome.storage.sync.get(keys, callback);
  } else {
    browser.storage.sync.get(keys).then((res) => {
      if (res) {
        callback(res);
      }
    });
  }
};

export const set = (
  items: Object,
  callback?: (() => void) | undefined
): void => {
  const browserName = detectBrowser();
  if (browserName === 'chrome') {
    return chrome.storage.sync.set(items, callback);
  } else {
    browser.storage.sync.set(items).then(() => {
      if (callback) {
        callback();
      }
    });
  }
};
