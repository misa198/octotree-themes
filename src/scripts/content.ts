import * as domLoaded from 'dom-loaded';
import * as fileIcons from 'file-icons-js';
import mobile from 'is-mobile';
import select from 'select-dom';
import { observe } from 'selector-observer';
import { colorThemeDeaultClass, colorThemes } from './constants/colorThemes';
import { Keys } from './constants/keys';
import {
  getMuiDirExpandedIcon,
  getMUIDirIcon,
  getMuiFileIcon,
} from './libs/mui';
import { detectBrowser } from './utils/detectBrowser';
import { get, set } from './utils/storage';
// Content css
import '../styles/icons/icons.scss';
import '../styles/octotree.scss';
import '../styles/themes/code.scss';
import '../styles/themes/gist.scss';
import './constants/colorThemesScss';
import { getResourceURL } from './utils/getResourceURL';
import { IconThemes } from './constants/iconThemes';

// ============ Icon theme ===================

const fonts = [
  { name: 'FontAwesome', path: 'fonts/fontawesome.woff2' },
  { name: 'Mfizz', path: 'fonts/mfixx.woff2' },
  { name: 'Devicons', path: 'fonts/devopicons.woff2' },
  { name: 'file-icons', path: 'fonts/file-icons.woff2' },
  { name: 'octicons', path: 'fonts/octicons.woff2' },
  { name: 'mui-icons', path: 'fonts/mui-icons.ttf' },
];

let octotree = false;
let github = false;
let iconTheme = IconThemes.MUI;
const browserName = detectBrowser();
const githubMuiIconClass = 'github-mui-icon';
const muiIconClass = 'mui-icon';
const muiDirClass = 'mui-icon-dir';
const muiDirExpandedClass = 'mui-icon-dir-expanded';

const loadFonts = () => {
  for (const font of fonts) {
    const fontFace = new FontFace(
      font.name,
      `url("${getResourceURL(font.path)}") format("woff2")`,
      {
        style: 'normal',
        weight: 'normal',
      }
    );

    fontFace
      .load()
      .then((loadedFontFace) => document.fonts.add(loadedFontFace));
  }
};

const getGitHubMobileFilename = (filenameDom: HTMLElement) =>
  Array.from(filenameDom.childNodes)
    .filter((node) => node.nodeType === node.TEXT_NODE)
    .map((node) => node.nodeValue!.trim())
    .join('');

const isMobile = mobile();

const replaceGithubIcon = ({
  iconDom,
  filenameDom,
  isDir,
}: {
  iconDom: HTMLElement | null;
  filenameDom: HTMLElement;
  isDir: boolean;
}) => {
  const fileName = isMobile
    ? getGitHubMobileFilename(filenameDom)
    : filenameDom.innerText.trim();
  if (iconTheme === IconThemes.MUI) {
    let icon;
    if (!isDir) icon = getMuiFileIcon(fileName);
    else icon = getMUIDirIcon(fileName);
    if (iconDom) {
      const img = document.createElement('img');
      img.classList.add(githubMuiIconClass);
      img.src = icon;
      iconDom.parentNode?.replaceChild(img, iconDom as HTMLElement);
    }
  } else {
    const className: string | null = fileIcons.getClassWithColor(fileName);
    if (className && !isDir) {
      const icon = document.createElement('span');
      icon.className = `icon octicon-file ${className}`;
      if (iconDom) {
        iconDom.parentNode!.replaceChild(icon, iconDom as HTMLElement);
      }
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

  let isDir = false;
  if (iconDom) {
    if (
      iconDom.parentElement!.getAttribute('aria-expanded') === 'false' ||
      iconDom.parentElement!.getAttribute('aria-expanded') === 'true'
    ) {
      isDir = true;
    }
  }

  if (iconTheme === IconThemes.MUI) {
    if (iconDom) {
      const foundIcon =
        iconDom.parentElement?.getElementsByClassName(muiIconClass);
      if (!foundIcon || foundIcon.length === 0) {
        if (isDir) {
          const [icon, expandedIcon] = [
            getMUIDirIcon(filename),
            getMuiDirExpandedIcon(filename),
          ];

          const img = document.createElement('img');
          img.classList.add(muiIconClass);
          img.classList.add(muiDirClass);
          img.src = icon;
          const expandedImg = document.createElement('img');
          expandedImg.classList.add(muiIconClass);
          expandedImg.classList.add(muiDirExpandedClass);
          expandedImg.src = expandedIcon;
          iconDom.parentElement?.classList.add('octotree-mui-icon-provider');
          iconDom.parentNode?.appendChild(img);
          iconDom.parentNode?.appendChild(expandedImg);
        } else {
          const icon = getMuiFileIcon(filename);
          if (icon) {
            const img = document.createElement('img');
            img.classList.add(muiIconClass);
            img.src = icon;
            iconDom.parentElement?.classList.add('octotree-mui-icon-provider');
            iconDom.parentNode?.appendChild(img);
          }
        }
      }
    }
  } else {
    const className: string | null = fileIcons.getClassWithColor(filename);
    if (className && !isDir) {
      const icon = document.createElement('i');
      icon.className = `icon octicon-file ot-octotree-icon ${iconDom?.classList.value} ${className}`;
      icon.setAttribute('role', 'presentation');
      icon.setAttribute('rel', 'blob octotree-default-icon octotree-icon-file');
      if (iconDom) {
        iconDom.parentNode!.replaceChild(icon, iconDom as HTMLElement);
      }
    }
  }
};

const init = async () => {
  if (iconTheme === IconThemes.ATOM) {
    loadFonts();
  }
  await domLoaded;

  if (github) {
    observe('.js-navigation-container > .js-navigation-item', {
      add(element) {
        const filenameDom = select('div[role="rowheader"] > span', element);
        if (!filenameDom) return;
        const dirIconDom = select(
          'svg[aria-label=Directory]',
          element
        ) as HTMLElement;
        const fileIconDom = select(
          'svg[aria-label=File]',
          element
        ) as HTMLElement;

        replaceGithubIcon({
          iconDom: dirIconDom || fileIconDom,
          filenameDom,
          isDir: Boolean(dirIconDom),
        });
      },
    });
  }

  if (octotree) {
    observe(
      '.jstree-container-ul.jstree-children.jstree-wholerow-ul.jstree-no-dots',
      {
        add() {
          observe('.octotree-sidebar', {
            add(element) {
              if (element) {
                select(
                  '.octotree-sidebar.octotree-github-sidebar.ui-resizable'
                )?.classList.add('ot-octotree-sidebar');
              }
            },
          });

          observe('.jstree-node', {
            add(element) {
              const filenameDom = select('.jstree-anchor > div', element);
              if (!filenameDom) return;

              replaceOctotreeIcon({
                iconDom: select(
                  '.jstree-anchor > .jstree-icon',
                  element
                ) as HTMLElement,
                filenameDom,
              });
            },
          });
        },
      }
    );
  }
};

// ============ Code color theme ===================

const changeTheme = (themeName?: string) => {
  const body = document.querySelector('body') as HTMLElement;
  const { classList } = body;
  const currentThemeClass = Array.from(classList).find((className) =>
    className.startsWith(`${colorThemeDeaultClass}`)
  );
  if (currentThemeClass) {
    body.classList.remove(currentThemeClass);
  }
  if (themeName) {
    const foundTheme = colorThemes.find(
      (colorTheme) => colorTheme === themeName
    );
    if (foundTheme) {
      classList.add(`${colorThemeDeaultClass}-${foundTheme}`);
      set({ [Keys.OT_CODE_COLOR_THEME]: foundTheme });
    } else set({ [Keys.OT_CODE_COLOR_THEME]: 'default' });
  }
};

const applyColorTheme = async () => {
  observe('body', {
    add() {
      get([Keys.OT_CODE_COLOR_THEME], (result) => {
        if (result) {
          const themeName = result[Keys.OT_CODE_COLOR_THEME];
          changeTheme(themeName);
        }
      });
    },
  });

  (browserName === 'chrome' ? chrome : browser).runtime.onMessage.addListener(
    (request) => {
      try {
        const message = JSON.parse(request.message);
        if (message.type === 'OT_CODE_COLOR_THEME') {
          changeTheme(message.codeColorTheme);
        }
      } catch (e) {}
    }
  );
};

(() => {
  get([Keys.OT_GITHUB, Keys.OT_OCTOTREE, Keys.OT_CODE_ICON_THEME], (result) => {
    github = result[Keys.OT_GITHUB] === true;
    octotree = result[Keys.OT_OCTOTREE] === true;
    iconTheme = result[Keys.OT_CODE_ICON_THEME];
  });
  init();
  applyColorTheme();
})();
