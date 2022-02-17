import { get, set } from './utils/storage';
import { detectBrowser } from './utils/detectBrowser';
import { KEYS } from './constants/keys';
import '../styles/popup.css';

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
  const code = 'window.location.reload();';
  if (detectBrowser() === 'chrome') {
    chrome.tabs.getSelected(function (tab) {
      chrome.tabs.executeScript(tab.id as number, { code });
    });
  } else {
    browser.tabs.query({ currentWindow: true, active: true }).then((tabs) => {
      browser.tabs.executeScript(tabs[0].id as number, { code });
    });
  }
  buttonSession.classList.add('hide');
}

githubCheckbox.addEventListener('click', onGithubCheckboxChange);
octotreeCheckbox.addEventListener('click', onOctotreeCheckboxChange);
refreshButton.addEventListener('click', reloadCurrentTab);
