import { get, set } from './utils/storage';
import { Keys } from './constants/keys';
import { getBrowserAction, getCurrentBrowser } from './utils/detectBrowser';
import { IconThemes } from './constants/iconThemes';

const urlRegex = new RegExp(
  /^https:\/\/(gist.)?github.com\/[(a-z)(A-Z)(0-9)_-]+\/[(a-z)(A-Z)(0-9)_-]+(\/?)((\/.+)?)(\?(.+))?$/
);

get(
  [
    Keys.OT_GITHUB,
    Keys.OT_OCTOTREE,
    Keys.OT_CODE_ICONS_THEME,
    Keys.OT_GITHUB_DIFF,
  ],
  (result) => {
    if (result[Keys.OT_GITHUB] === undefined) {
      set({ [Keys.OT_GITHUB]: true });
    }

    if (result[Keys.OT_OCTOTREE] === undefined) {
      set({ [Keys.OT_OCTOTREE]: true });
    }

    if (result[Keys.OT_GITHUB_DIFF] === undefined) {
      set({ [Keys.OT_GITHUB_DIFF]: true });
    }

    if (!Object.values(IconThemes).includes(result[Keys.OT_CODE_ICONS_THEME])) {
      set({ [Keys.OT_CODE_ICONS_THEME]: IconThemes.MUI });
    }
  }
);

const browserAction = getBrowserAction();
const currentBrowser = getCurrentBrowser();

currentBrowser.tabs.onActivated.addListener(function (info) {
  currentBrowser.tabs.get(info.tabId, function (change) {
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

currentBrowser.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
  if (changeInfo.status === 'complete') {
    currentBrowser.tabs.sendMessage(tabId, {
      message: Keys.OT_TAB_UPDATE,
    });
  }

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
