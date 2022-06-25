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

const colorThemesDesContent = `
export const colorThemeDeaultClass = 'ot-github-code-color-theme';
export const colorThemes = ${JSON.stringify(themes)};
`;

let colorThemesScssDesContent = ``;
themes.forEach((theme) => {
  colorThemesScssDesContent = colorThemesScssDesContent.concat(
    `import "../../styles/themes/code/${theme}.scss"\n`
  );
});

fs.writeFileSync(
  path.join(__dirname, '..', 'src', 'scripts', 'constants', 'colorThemes.ts'),
  colorThemesDesContent,
  'utf8'
);

fs.writeFileSync(
  path.join(
    __dirname,
    '..',
    'src',
    'scripts',
    'constants',
    'colorThemesScss.ts'
  ),
  colorThemesScssDesContent,
  'utf8'
);
