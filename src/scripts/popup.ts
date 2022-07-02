import * as capitalize from 'capitalize';
import { get, set } from './utils/storage';
import { detectBrowser } from './utils/detectBrowser';
import { Keys } from './constants/keys';
import { colorThemes } from './constants/colorThemes';
import '../styles/popup.scss';
import { IconThemes } from './constants/iconThemes';

const manifestData = chrome.runtime.getManifest();
const copyrightVerison = document.getElementById(
  Keys.OT_COPYRIGHT_VERSION
) as HTMLSpanElement;
const copyrightYear = document.getElementById(
  Keys.OT_COPYRIGHT_YEAR
) as HTMLSpanElement;
const copyrightHolder = document.getElementById(
  Keys.OT_COPYRIGHT_HOLDER
) as HTMLLinkElement;
copyrightVerison.innerText = `v${manifestData.version}`;
copyrightYear.innerText = new Date().getFullYear().toString();
copyrightHolder.href = manifestData.homepage_url as string;
copyrightHolder.innerText = manifestData.author as string;

const themeSelector = document.getElementById(
  Keys.OT_CODE_COLOR_THEME
) as HTMLSelectElement;

const iconsThemeSelector = document.getElementById(
  Keys.OT_CODE_ICONS_THEME
) as HTMLSelectElement;
const iconsThemes = Object.values(IconThemes);

colorThemes.forEach((colorTheme) => {
  const option = document.createElement('option');
  option.value = colorTheme;
  option.textContent = capitalize(colorTheme.split('-').join(' '));
  themeSelector.appendChild(option);
});

iconsThemes.forEach((theme) => {
  const option = document.createElement('option');
  option.value = theme;
  option.textContent = theme;
  iconsThemeSelector.appendChild(option);
});

const browserName = detectBrowser();

const githubCheckbox = document.getElementById(
  Keys.OT_GITHUB
) as HTMLInputElement;
const githubDiffCheckbox = document.getElementById(
  Keys.OT_GITHUB_DIFF
) as HTMLInputElement;
const octotreeCheckbox = document.getElementById(
  Keys.OT_OCTOTREE
) as HTMLInputElement;
const buttonSession = document.getElementById(
  Keys.OT_RELOAD_SEESSION
) as HTMLDivElement;
const refreshButton = document.getElementById(
  Keys.OT_RELOAD
) as HTMLButtonElement;

get([Keys.OT_GITHUB, Keys.OT_GITHUB_DIFF, Keys.OT_OCTOTREE], (result) => {
  githubCheckbox.checked = Boolean(result[Keys.OT_GITHUB]);
  githubDiffCheckbox.checked = Boolean(result[Keys.OT_GITHUB_DIFF]);
  octotreeCheckbox.checked = Boolean(result[Keys.OT_OCTOTREE]);
});

function onGithubCheckboxChange() {
  buttonSession.classList.remove('hide');
  set({ [Keys.OT_GITHUB]: githubCheckbox.checked });
}

function onGithubDiffCheckboxChange() {
  buttonSession.classList.remove('hide');
  set({ [Keys.OT_GITHUB_DIFF]: githubDiffCheckbox.checked });
}

function onOctotreeCheckboxChange() {
  buttonSession.classList.remove('hide');
  set({
    [Keys.OT_OCTOTREE]: octotreeCheckbox.checked,
  });
}

function reloadCurrentTab() {
  if (browserName === 'chrome') {
    chrome.tabs.query({ active: true }, (tabs) => {
      chrome.tabs.reload(tabs[0].id as number);
    });
  } else {
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
      browser.tabs.executeScript(tabs[0].id as number, {
        code: 'window.location.reload();',
      });
    });
  }
  buttonSession.classList.add('hide');
}

githubCheckbox.addEventListener('click', onGithubCheckboxChange);
githubDiffCheckbox.addEventListener('click', onGithubDiffCheckboxChange);
octotreeCheckbox.addEventListener('click', onOctotreeCheckboxChange);
refreshButton.addEventListener('click', reloadCurrentTab);

// ============= Icons theme =================
get([Keys.OT_CODE_ICONS_THEME], (result) => {
  if (result) {
    const themeName = result[Keys.OT_CODE_ICONS_THEME];
    const foundTheme = iconsThemes.find(
      (colorTheme) => colorTheme === themeName
    );
    if (foundTheme) {
      iconsThemeSelector.value = foundTheme;
    } else iconsThemeSelector.value = iconsThemes[0];
  }
});

function onSelectIconTheme(event: Event) {
  const theme = (event.target as HTMLSelectElement).value;
  set({ [Keys.OT_CODE_ICONS_THEME]: theme });
  buttonSession.classList.remove('hide');
}
iconsThemeSelector.addEventListener('change', onSelectIconTheme);

// ============= Code color theme =============
get([Keys.OT_CODE_COLOR_THEME], (result) => {
  if (result) {
    const themeName = result[Keys.OT_CODE_COLOR_THEME];
    const foundTheme = colorThemes.find(
      (colorTheme) => colorTheme === themeName
    );
    if (foundTheme) {
      themeSelector.value = foundTheme;
    } else themeSelector.value = 'default';
  }
});

function onSelectCodeColorTheme(event: Event) {
  const message = {
    codeColorTheme: (event.target as HTMLSelectElement).value,
    type: 'OT_CODE_COLOR_THEME',
  };
  if (browserName === 'chrome') {
    chrome.tabs.query({}, (tabs) => {
      tabs.forEach((tab) => {
        chrome.tabs.sendMessage(tab.id as number, {
          message: JSON.stringify(message),
        });
      });
    });
  } else {
    browser.tabs.query({}).then((tabs) => {
      tabs.forEach((tab) => {
        browser.tabs.sendMessage(tab.id as number, {
          message: JSON.stringify(message),
        });
      });
    });
  }
}

themeSelector.addEventListener('change', onSelectCodeColorTheme);
