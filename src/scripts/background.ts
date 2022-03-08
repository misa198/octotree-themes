import { set, get } from './utils/storage';
import { KEYS } from './constants/keys';
import { detectBrowser } from './utils/detectBrowser';
const urlRegex = new RegExp(
  /^https:\/\/(gist.)?github.com\/[(a-z)(A-Z)(0-9)_-]+\/[(a-z)(A-Z)(0-9)_-]+(\/?)((\/.+)?)(\?(.+))?$/
);

get([KEYS.MISA198_GITHUB, KEYS.MISA198_OCTOTREE], (result) => {
  if (result[KEYS.MISA198_GITHUB] === undefined) {
    set({ [KEYS.MISA198_GITHUB]: true });
  }

  if (result[KEYS.MISA198_OCTOTREE] === undefined) {
    set({ [KEYS.MISA198_OCTOTREE]: true });
  }
});

const browserName = detectBrowser();
const browserAction =
  chrome[browserName === 'chrome' ? 'action' : 'browserAction'];

chrome.tabs.onActivated.addListener(function (info) {
  chrome.tabs.get(info.tabId, function (change) {
    if (change.url === undefined) {
      // Url is null
      browserAction.setPopup({
        tabId: info.tabId,
        popup: 'popup-disabled.html',
      });
      browserAction.setIcon({
        path: 'icons/icon64-disabled.png',
        tabId: info.tabId,
      });
    } else if (change.url.match(urlRegex) === null) {
      // Url not match
      browserAction.setPopup({
        tabId: info.tabId,
        popup: 'popup-disabled.html',
      });
      browserAction.setIcon({
        path: 'icons/icon64-disabled.png',
        tabId: info.tabId,
      });
    } else {
      // Url match
      browserAction.setPopup({
        tabId: info.tabId,
        popup: 'popup.html',
      });
      browserAction.setIcon({
        path: 'icons/icon64.png',
        tabId: info.tabId,
      });
    }
  });
});

chrome.tabs.onUpdated.addListener(function (tabId, _, tab) {
  if (tab.url === undefined) {
    return;
  } else if (tab.url.match(urlRegex) === null) {
    browserAction.setPopup({
      tabId: tabId,
      popup: 'popup-disabled.html',
    });
    browserAction.setIcon({
      path: 'icons/icon64-disabled.png',
      tabId: tabId,
    });
  } else {
    browserAction.setPopup({
      tabId: tabId,
      popup: 'popup.html',
    });
    browserAction.setIcon({
      path: 'icons/icon64.png',
      tabId: tabId,
    });
  }
});
