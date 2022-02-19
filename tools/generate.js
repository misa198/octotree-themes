const fs = require('fs');
const path = require('path');

const codeThemeFiles = fs.readdirSync(
  path.join(__dirname, '..', 'src', 'styles', 'themes', 'code')
);

const themes = [];

codeThemeFiles.forEach((file) => {
  const themeName = file.replace('.scss', '');
  themes.push(themeName);
});

const desContent = `
export const colorThemeDeaultClass = 'misa198-code-color-theme';
export const colorThemes = ${JSON.stringify(themes)};
`;

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'scripts', 'constants', 'colorThemes.ts'),
  desContent,
  'utf8'
);
