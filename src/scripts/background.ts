import { set, get } from './storage';
import { KEYS } from './keys';
const urlRegex = new RegExp(
  /^https:\/\/github.com\/[(a-z)(A-Z)(0-9)_-]+\/[(a-z)(A-Z)(0-9)_-]+(\/?)((\/.+)?)(\?(.+))?$/
);

get([KEYS.MISA198_GITHUB, KEYS.MISA198_OCTOTREE], (result) => {
  if (result[KEYS.MISA198_GITHUB] === undefined) {
    set({ [KEYS.MISA198_GITHUB]: true });
  }

  if (result[KEYS.MISA198_OCTOTREE] === undefined) {
    set({ [KEYS.MISA198_OCTOTREE]: true });
  }
});

chrome.tabs.onActivated.addListener(function (info) {
  chrome.tabs.get(info.tabId, function (change) {
    if (change.url === undefined) {
      // Url is null
      chrome.browserAction.setPopup({
        tabId: info.tabId,
        popup: 'popup-disabled.html',
      });
      chrome.browserAction.setIcon({
        path: 'icons/icon64-disabled.png',
        tabId: info.tabId,
      });
    } else if (change.url.match(urlRegex) === null) {
      // Url not match
      chrome.browserAction.setPopup({
        tabId: info.tabId,
        popup: 'popup-disabled.html',
      });
      chrome.browserAction.setIcon({
        path: 'icons/icon64-disabled.png',
        tabId: info.tabId,
      });
    } else {
      // Url match
      chrome.browserAction.setPopup({
        tabId: info.tabId,
        popup: 'popup.html',
      });
      chrome.browserAction.setIcon({
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
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: 'popup-disabled.html',
    });
    chrome.browserAction.setIcon({
      path: 'icons/icon64-disabled.png',
      tabId: tabId,
    });
  } else {
    chrome.browserAction.setPopup({
      tabId: tabId,
      popup: 'popup.html',
    });
    chrome.browserAction.setIcon({ path: 'icons/icon64.png', tabId: tabId });
  }
});
