import * as capitalize from 'capitalize';
import { get, set } from './utils/storage';
import { detectBrowser } from './utils/detectBrowser';
import { KEYS } from './constants/keys';
import { colorThemes } from './constants/colorThemes';
import '../styles/popup.scss';

const themeSelector = document.getElementById(
  'select-code-color-theme'
) as HTMLSelectElement;

colorThemes.forEach((colorTheme) => {
  const option = document.createElement('option');
  option.value = colorTheme;
  option.textContent = capitalize(colorTheme.split('-').join(' '));
  themeSelector.appendChild(option);
});

const browserName = detectBrowser();

const githubCheckbox = document.getElementById(
  KEYS.MISA198_GITHUB
) as HTMLInputElement;
const octotreeCheckbox = document.getElementById(
  KEYS.MISA198_OCTOTREE
) as HTMLInputElement;
const buttonSession = document.getElementById(
  KEYS.MISA198_RELOAD
) as HTMLDivElement;
const refreshButton = document.getElementById(
  'refreshButton'
) as HTMLButtonElement;

get([KEYS.MISA198_GITHUB, KEYS.MISA198_OCTOTREE], (result) => {
  githubCheckbox.checked = Boolean(result.misa198Github);
  octotreeCheckbox.checked = Boolean(result.misa198Octotree);
});

function onGithubCheckboxChange() {
  buttonSession.classList.remove('hide');
  set({ [KEYS.MISA198_GITHUB]: githubCheckbox.checked });
}

function onOctotreeCheckboxChange() {
  buttonSession.classList.remove('hide');
  set({
    [KEYS.MISA198_OCTOTREE]: octotreeCheckbox.checked,
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
octotreeCheckbox.addEventListener('click', onOctotreeCheckboxChange);
refreshButton.addEventListener('click', reloadCurrentTab);

// ============= Code color theme =============
get([KEYS.MISA198_CODE_COLOR_THEME], (result) => {
  const select = document.getElementById(
    'select-code-color-theme'
  ) as HTMLSelectElement;
  if (result) {
    const themeName = result[KEYS.MISA198_CODE_COLOR_THEME];
    const foundTheme = colorThemes.find(
      (colorTheme) => colorTheme === themeName
    );
    if (foundTheme) {
      select.value = foundTheme;
    } else select.value = 'default';
  }
});

function onSelectCodeColorTheme(event: Event) {
  const message = {
    codeColorTheme: (event.target as HTMLSelectElement).value,
    type: 'MISA198_CODE_COLOR_THEME',
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

const selectCodeColorTheme = document.querySelector(
  '#select-code-color-theme'
) as HTMLSelectElement;
selectCodeColorTheme.addEventListener('change', onSelectCodeColorTheme);
