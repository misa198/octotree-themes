import { getResourceURL } from '../../utils/getResourceURL';
import { extentions } from './extensions';
import { files } from './files';
import { folders, foldersExpanded } from './folders';
import { icons } from './icons';

export const getMuiFileIcon = (fileName: string) => {
  let iconName = 'file';
  const lowerCaseFileName = fileName.toLowerCase();

  const ext = lowerCaseFileName.split('.').pop();
  if (ext && extentions[ext]) iconName = extentions[ext];
  if (files[lowerCaseFileName]) iconName = files[lowerCaseFileName];
  if (files[fileName]) iconName = files[fileName];

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
