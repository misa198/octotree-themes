import { getCurrentBrowser } from './detectBrowser';

export const getResourceURL = (path: string) => {
  const currentBrowser = getCurrentBrowser();
  return currentBrowser.runtime.getURL(path);
};
