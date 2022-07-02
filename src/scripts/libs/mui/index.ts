import { getResourceURL } from '../../utils/getResourceURL';
import { extentions } from './extensions';
import { files } from './files';
import { folders, foldersExpanded } from './folders';
import { icons } from './icons';

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
      console.log(currentPath);
      if (extentions[currentPath]) iconName = extentions[currentPath];
    });
  }

  return getResourceURL(`assets/mui/${icons[iconName]}`);
};

export const getMUIDirIcon = (dirName: string) => {
  const dirIcon = folders[dirName] || 'folder';
  return getResourceURL(`assets/mui/${icons[dirIcon]}`);
};

export const getMuiDirExpandedIcon = (dirName: string) => {
  const dirIcon = foldersExpanded[dirName] || 'folder-open';
  return getResourceURL(`assets/mui/${icons[dirIcon]}`);
};
