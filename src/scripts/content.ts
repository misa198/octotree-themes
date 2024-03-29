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
  getMUISubmoduleIcon,
} from './libs/mui';
import { getCurrentBrowser } from './utils/detectBrowser';
import { get, set } from './utils/storage';
// Content css
import '../styles/icons/icons.scss';
import '../styles/octotree.scss';
import '../styles/themes/code.scss';
import '../styles/themes/gist.scss';
import './constants/colorThemesScss';
import { getResourceURL } from './utils/getResourceURL';
import { IconThemes } from './constants/iconThemes';

const currentBrowser = getCurrentBrowser();

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
let githubDiff = false;
let iconTheme = IconThemes.MUI;
const githubMuiIconClass = 'github-mui-icon';
const muiIconOctotreeClass = 'mui-icon-octotree';
const muiDirClass = 'mui-icon-dir';
const muiDirExpandedClass = 'mui-icon-dir-expanded';
const muiDiffDirClass = 'mui-icon-diff-dir';
const muiDiffDirExpandedClass = 'mui-icon-diff-dir-expanded';
const muiIconDiffClass = 'mui-icon-github-diff';

const loadFonts = () => {
  for (const font of fonts) {
    const fontFace = new FontFace(
      font.name,
      `url("${getResourceURL(font.path)}")`
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
  isSubmodule,
}: {
  iconDom: HTMLElement | null;
  filenameDom: HTMLElement;
  isDir: boolean;
  isSubmodule: boolean;
}) => {
  const fileName = isMobile
    ? getGitHubMobileFilename(filenameDom)
    : filenameDom.innerText.trim();
  if (iconTheme === IconThemes.MUI) {
    let icon;
    if (!isDir)
      icon = isSubmodule ? getMUISubmoduleIcon() : getMuiFileIcon(fileName);
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

const replaceGithubDiffIcon = ({
  iconDom,
  filenameDom,
  isDir,
  isSubmodule,
}: {
  iconDom: HTMLElement | null;
  filenameDom: HTMLElement;
  isDir: boolean;
  isSubmodule: boolean;
}) => {
  const fileName = isMobile
    ? getGitHubMobileFilename(filenameDom)
    : filenameDom.innerText.trim();
  if (iconTheme === IconThemes.MUI) {
    if (iconDom) {
      if (isDir) {
        const [icon, expandedIcon] = [
          getMUIDirIcon(fileName),
          getMuiDirExpandedIcon(fileName),
        ];
        const img = document.createElement('img');
        img.classList.add(muiIconDiffClass);
        img.classList.add(muiDiffDirClass);
        img.src = icon;
        const expandedImg = document.createElement('img');
        expandedImg.classList.add(muiIconDiffClass);
        expandedImg.classList.add(muiDiffDirExpandedClass);
        expandedImg.src = expandedIcon;
        iconDom.parentElement?.classList.add('octotree-mui-icon-provider');
        iconDom.parentNode?.replaceChild(img, iconDom);
        img.parentNode?.appendChild(expandedImg);
      } else {
        const icon = isSubmodule
          ? getMUISubmoduleIcon()
          : getMuiFileIcon(fileName);
        if (icon) {
          const img = document.createElement('img');
          img.classList.add(muiIconDiffClass);
          img.src = icon;
          iconDom.parentElement?.classList.add('octotree-mui-icon-provider');
          iconDom.parentNode?.replaceChild(img, iconDom);
        }
      }
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
        iconDom.parentElement?.getElementsByClassName(muiIconOctotreeClass);
      if (!foundIcon || foundIcon.length === 0) {
        if (isDir) {
          const [icon, expandedIcon] = [
            getMUIDirIcon(filename),
            getMuiDirExpandedIcon(filename),
          ];
          const img = document.createElement('img');
          img.classList.add(muiIconOctotreeClass);
          img.classList.add(muiDirClass);
          img.src = icon;
          const expandedImg = document.createElement('img');
          expandedImg.classList.add(muiIconOctotreeClass);
          expandedImg.classList.add(muiDirExpandedClass);
          expandedImg.src = expandedIcon;
          iconDom.parentElement?.classList.add('octotree-mui-icon-provider');
          iconDom.parentNode?.appendChild(img);
          iconDom.parentNode?.appendChild(expandedImg);
        } else {
          const isSubmodule = !Boolean(
            iconDom.parentElement?.getAttribute('data-download-url')
          );
          const icon = isSubmodule
            ? getMUISubmoduleIcon()
            : getMuiFileIcon(filename);
          if (icon) {
            const img = document.createElement('img');
            img.classList.add(muiIconOctotreeClass);
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
  if (iconTheme === IconThemes.ATOM) loadFonts();
  await domLoaded;

  if (github) {
    // Github tree
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
        const submoduleIconDom = select(
          'svg[aria-label=Submodule]',
          element
        ) as HTMLElement;

        replaceGithubIcon({
          iconDom: dirIconDom || submoduleIconDom || fileIconDom,
          filenameDom,
          isDir: Boolean(dirIconDom),
          isSubmodule: Boolean(submoduleIconDom),
        });
      },
    });

    // Github code view
    // Main
    observe('table[aria-labelledby=folders-and-files] .react-directory-row', {
      add(element) {
        const _element = element as HTMLElement;
        const name =
          _element
            .querySelector('.react-directory-truncate')
            ?.getAttribute('title') || '';
        const type = _element.querySelector('.sr-only')?.innerHTML;
        const icon = _element.querySelector('svg[role="img"]');
        if (iconTheme === IconThemes.MUI) {
          let replaceIcon = '';
          switch (type) {
            case '(Directory)':
              replaceIcon = getMUIDirIcon(name);
              break;
            case '(Submodule)':
              replaceIcon = getMUISubmoduleIcon();
              break;
            case '(File)':
              replaceIcon = getMuiFileIcon(name);
              break;
          }
          if (replaceIcon) {
            const img = document.createElement('img');
            img.className = 'github-code-view-icon';
            img.src = replaceIcon;
            icon?.parentNode?.replaceChild(img, icon);
          }
        } else {
          switch (type) {
            case '(File)':
              const className: string | null =
                fileIcons.getClassWithColor(name);
              if (className) {
                const spanIcon = document.createElement('span');
                spanIcon.className = `icon octicon-file ${className}`;
                icon?.parentNode?.replaceChild(spanIcon, icon);
              }
              break;
            case '(Directory)':
              icon?.classList.add('octicon');
              icon?.classList.add('octicon-file-directory-fill');
              break;
          }
        }
      },
    });

    observe(
      'table[aria-labelledby=folders-and-files] a[aria-label="Parent directory"]',
      {
        add(element) {
          const icon = element.querySelector('svg[role="img"]');
          if (iconTheme === IconThemes.MUI) {
            const replaceIcon = getMUIDirIcon('..');
            const img = document.createElement('img');
            img.className =
              'github-code-view-icon github-code-view-parent-dir-icon';
            img.src = replaceIcon;
            icon?.parentNode?.replaceChild(img, icon);
          } else {
            icon?.classList.add('octicon');
            icon?.classList.add('octicon-file-directory-fill');
          }
        },
      }
    );

    // Tree
    observe(
      'div[data-testid=repos-file-tree-container] .PRIVATE_TreeView-item-content',
      {
        add(element) {
          const icon = element.querySelector('svg[role="img"]');
          const name =
            element.querySelector('.PRIVATE_TreeView-item-content-text')
              ?.textContent || '';
          const iconParent = icon?.parentElement;
          let type = '';
          if (
            iconParent?.classList.contains('PRIVATE_TreeView-directory-icon')
          ) {
            type = '(Directory)';
          } else {
            type = '(File)';
          }

          if (iconTheme === IconThemes.MUI) {
            switch (type) {
              case '(Directory)':
                const replaceIconDir = getMUIDirIcon(name);
                const replaceExpandIconDir = getMuiDirExpandedIcon(name);
                const imgDir = document.createElement('img');
                imgDir.className =
                  'github-code-view-icon github-code-view-icon-dir-collapse';
                imgDir.src = replaceIconDir;
                icon?.parentNode?.appendChild(imgDir);

                const expandImg = document.createElement('img');
                expandImg.className =
                  'github-code-view-icon github-code-view-icon-dir-expand';
                expandImg.src = replaceExpandIconDir;
                icon?.parentElement?.appendChild(expandImg);

                break;
              case '(File)':
                const replaceIcon = getMuiFileIcon(name);
                const img = document.createElement('img');
                img.className = 'github-code-view-icon';
                img.src = replaceIcon;
                icon?.parentNode?.replaceChild(img, icon);

                break;
            }
            icon?.parentElement?.classList.add('github-tree-icon-hidden');
          } else {
            switch (type) {
              case '(File)':
                const className: string | null =
                  fileIcons.getClassWithColor(name);
                if (className) {
                  const spanIcon = document.createElement('span');
                  spanIcon.className = `icon octicon-file ${className}`;
                  icon?.parentNode?.replaceChild(spanIcon, icon);
                }
                break;
              case '(Directory)':
                icon?.parentElement?.classList.add(
                  'octicon-file-directory-fill-parent'
                );
                break;
            }
          }
        },
      }
    );
  }

  if (githubDiff) {
    observe('diff-layout nav > ul li > .ActionList-content', {
      add(element) {
        const filenameDom = select('.ActionList-item-label', element);
        if (!filenameDom) return;
        const dirIconDom = select(
          'svg[aria-label=Directory]',
          element
        ) as HTMLElement;
        const fileIconDom = select(
          'svg[aria-label=File]',
          element
        ) as HTMLElement;
        const submoduleIconDom = select(
          'svg[aria-label=Submodule]',
          element
        ) as HTMLElement;

        replaceGithubDiffIcon({
          iconDom: dirIconDom || submoduleIconDom || fileIconDom,
          filenameDom,
          isDir: Boolean(dirIconDom),
          isSubmodule: Boolean(submoduleIconDom),
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
  const html = document.querySelector('html') as HTMLElement;
  const { classList } = html;
  const currentThemeClass = Array.from(classList).find((className) =>
    className.startsWith(`${colorThemeDeaultClass}`)
  );
  if (currentThemeClass) {
    html.classList.remove(currentThemeClass);
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
  observe('html', {
    add() {
      get([Keys.OT_CODE_COLOR_THEME], (result) => {
        if (result) {
          const themeName = result[Keys.OT_CODE_COLOR_THEME];
          changeTheme(themeName);
        }
      });
    },
  });

  currentBrowser.runtime.onMessage.addListener((request) => {
    try {
      const message = JSON.parse(request.message);
      if (message.type === 'OT_CODE_COLOR_THEME') {
        changeTheme(message.codeColorTheme);
      }
    } catch (e) {}
  });
};

get(
  [
    Keys.OT_GITHUB,
    Keys.OT_OCTOTREE,
    Keys.OT_CODE_ICONS_THEME,
    Keys.OT_GITHUB_DIFF,
  ],
  (result) => {
    github = result[Keys.OT_GITHUB] === true;
    octotree = result[Keys.OT_OCTOTREE] === true;
    githubDiff = result[Keys.OT_GITHUB_DIFF] === true;
    iconTheme = result[Keys.OT_CODE_ICONS_THEME];

    init();
    applyColorTheme();

    currentBrowser.runtime.onMessage.addListener(function (request) {
      if (request.message === Keys.OT_TAB_UPDATE) {
        applyColorTheme();
      }
    });
  }
);
