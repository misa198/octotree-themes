import { getResourceURL } from '../../utils/getResourceURL';
import { extentions } from './extensions';
import { files } from './files';
import { folders, foldersExpanded } from './folders';
import { icons } from './icons';

export const getMUISubmoduleIcon = () =>
  getResourceURL(`assets/mui/${icons[folders['submodules']]}`);

export const getMuiFileIcon = (fileName: string) => {
  let iconName = 'file';
  const lowerCaseFileName = fileName.toLowerCase();

  if (files[fileName]) iconName = files[fileName];
  else if (files[lowerCaseFileName]) iconName = files[lowerCaseFileName];
  else {
    const splitedName = lowerCaseFileName.split('.').reverse();
    let currentPath = '';
    splitedName.forEach((path, index) => {
      if (index === 0) currentPath = path;
      else currentPath = `${path}.${currentPath}`;
      if (extentions[currentPath]) iconName = extentions[currentPath];
    });
  }

  return getResourceURL(`assets/mui/${icons[iconName]}`);
};

const getMUIDirQuery = (dirName: string) => {
  const paths = dirName.split('/');
  let query = '';
  if (paths.length === 1) query = paths[0];
  query = paths[paths.length - 1];
  return query;
};

export const getMUIDirIcon = (dirName: string) => {
  const query = getMUIDirQuery(dirName);
  const dirIcon = folders[query] || folders[query.toLowerCase()] || 'folder';
  return getResourceURL(`assets/mui/${icons[dirIcon]}`);
};

export const getMuiDirExpandedIcon = (dirName: string) => {
  const query = getMUIDirQuery(dirName);
  const dirIcon =
    foldersExpanded[query] ||
    foldersExpanded[query.toLowerCase()] ||
    'folder-open';
  return getResourceURL(`assets/mui/${icons[dirIcon]}`);
};
