import '../styles/popup.css';

const KEYS = {
  MISA198_OCTOTREE: 'misa198Octotree',
  MISA198_GITHUB: 'misa198Github',
  MISA198_RELOAD: 'misa198Reload',
};

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

chrome.storage.sync.get(
  [KEYS.MISA198_GITHUB, KEYS.MISA198_OCTOTREE],
  (result) => {
    githubCheckbox.checked = Boolean(result.misa198Github);
    octotreeCheckbox.checked = Boolean(result.misa198Octotree);
  }
);

function onGithubCheckboxChange() {
  chrome.storage.sync.set({ [KEYS.MISA198_GITHUB]: githubCheckbox.checked });
  buttonSession.classList.remove('hide');
}

function onOctotreeCheckboxChange() {
  chrome.storage.sync.set({
    [KEYS.MISA198_OCTOTREE]: octotreeCheckbox.checked,
  });
  buttonSession.classList.remove('hide');
}

function reloadCurrentTab() {
  chrome.tabs.getSelected(function (tab) {
    var code = 'window.location.reload();';
    chrome.tabs.executeScript(tab.id as number, { code: code });
  });
  buttonSession.classList.add('hide');
}

githubCheckbox.addEventListener('click', onGithubCheckboxChange);
octotreeCheckbox.addEventListener('click', onOctotreeCheckboxChange);
refreshButton.addEventListener('click', reloadCurrentTab);
