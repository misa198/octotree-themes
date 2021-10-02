import * as fileIcons from 'file-icons-js';
import * as domLoaded from 'dom-loaded';
import select from 'select-dom';
import mobile from 'is-mobile';
import { observe } from 'selector-observer';

import { StorageKey } from './background';
import '../css/icons.css';

let colorsDisabled = false;
let darkMode = false;

const fonts = [
  { name: 'FontAwesome', path: 'fonts/fontawesome.woff2' },
  { name: 'Mfizz', path: 'fonts/mfixx.woff2' },
  { name: 'Devicons', path: 'fonts/devopicons.woff2' },
  { name: 'file-icons', path: 'fonts/file-icons.woff2' },
  { name: 'octicons', path: 'fonts/octicons.woff2' },
];

const loadFonts = () => {
  fonts.forEach((font) => {
    const fontFace = new FontFace(
      font.name,
      `url("${chrome.extension.getURL(font.path)}") format("woff2")`,
      {
        style: 'normal',
        weight: 'normal',
      }
    );

    fontFace
      .load()
      .then((loadedFontFace) => document.fonts.add(loadedFontFace));
  });
};

const getGitHubMobileFilename = (filenameDom: HTMLElement) =>
  Array.from(filenameDom.childNodes)
    .filter((node) => node.nodeType === node.TEXT_NODE)
    .map((node) => node.nodeValue!.trim())
    .join('');

const isMobile = mobile();

const replaceIcon = ({
  iconDom,
  filenameDom,
}: {
  iconDom: HTMLElement | null;
  filenameDom: HTMLElement;
}) => {
  const filename = isMobile
    ? getGitHubMobileFilename(filenameDom)
    : filenameDom.innerText.trim();

  let isDirectory = false;
  if (iconDom) {
    isDirectory = iconDom.classList.contains('octicon-file-directory');
  }

  const className: string | null = colorsDisabled
    ? fileIcons.getClass(filename)
    : fileIcons.getClassWithColor(filename);

  const darkClassName = darkMode ? 'dark' : '';

  if (className && !isDirectory) {
    const icon = document.createElement('span');
    icon.className = `icon octicon-file ${className} ${darkClassName}`;
    if (iconDom) {
      iconDom.parentNode!.replaceChild(icon, iconDom as HTMLElement);
    }
  }
};

const replaceOctotreeIcon = ({
  iconDom,
  filenameDom,
}: {
  iconDom: HTMLElement | null;
  filenameDom: HTMLElement;
}) => {
  const filename = isMobile
    ? getGitHubMobileFilename(filenameDom)
    : filenameDom.innerText.trim();

  let isDirectory = false;
  if (iconDom) {
    if (
      iconDom.parentElement!.classList.contains('jstree-closed') ||
      iconDom.parentElement!.classList.contains('jstree-open')
    ) {
      isDirectory = true;
    }
  }

  const className: string | null = colorsDisabled
    ? fileIcons.getClass(filename)
    : fileIcons.getClassWithColor(filename);

  const darkClassName = darkMode ? 'dark' : '';

  if (className && !isDirectory) {
    const icon = document.createElement('span');
    icon.className = `icon octicon-file misa198-octotree-icon ${className} ${darkClassName}`;

    if (iconDom) {
      iconDom.parentNode!.replaceChild(icon, iconDom as HTMLElement);
    }
  }
};

const init = async () => {
  loadFonts();
  await domLoaded;

  observe('.js-navigation-container > .js-navigation-item', {
    add(element) {
      const filenameDom = select('div[role="rowheader"] > span', element);

      if (!filenameDom) {
        return;
      }

      replaceIcon({
        iconDom: select('.octicon-file', element) as HTMLElement,
        filenameDom,
      });
    },
  });

  observe('.jstree-node', {
    add(element) {
      if (darkMode) {
        document
          .querySelectorAll(
            '.octotree-sidebar.octotree-github-sidebar .octotree-views .octotree-view.octotree-tree-view .jstree-anchor div'
          )
          .forEach((e) => {
            e.classList.add('misa198-dark-text');
          });
      }

      const filenameDom = select('.jstree-anchor > div', element);

      if (!filenameDom) {
        return;
      }

      replaceOctotreeIcon({
        iconDom: select(
          '.jstree-anchor > .jstree-icon',
          element
        ) as HTMLElement,
        filenameDom,
      });
    },
  });
};

chrome.storage.sync.get(
  [StorageKey.ColorsDisabled, StorageKey.DarkMode],
  (result) => {
    colorsDisabled =
      result.colorsDisabled === undefined
        ? colorsDisabled
        : result.colorsDisabled;

    darkMode = Boolean(select("html[data-color-mode='dark']"));

    init();
  }
);
