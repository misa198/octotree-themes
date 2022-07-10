export const detectBrowser = () => {
  const userAgent = navigator.userAgent;
  let browserName;

  if (userAgent.match(/chrome|chromium|crios/i)) {
    browserName = 'chrome';
  } else if (userAgent.match(/firefox|fxios/i)) {
    browserName = 'firefox';
  } else if (userAgent.match(/safari/i)) {
    browserName = 'safari';
  } else if (userAgent.match(/opr\//i)) {
    browserName = 'opera';
  } else if (userAgent.match(/edg/i)) {
    browserName = 'edge';
  } else {
    browserName = 'No browser detection';
  }
  return browserName;
};

export const getBrowserAction = () => {
  const browserName = detectBrowser();
  return browserName === 'chrome'
    ? chrome.action
      ? chrome.action
      : chrome.browserAction
    : browser.browserAction;
};

export const getCurrentBrowser = () => {
  const browserName = detectBrowser();
  return browserName === 'chrome' ? chrome : browser;
};
