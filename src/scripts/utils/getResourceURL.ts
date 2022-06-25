import { detectBrowser } from './detectBrowser';

export const getResourceURL = (path: string) => {
  const browserName = detectBrowser();
  return (browserName === 'chrome' ? chrome : browser).runtime.getURL(path);
};
