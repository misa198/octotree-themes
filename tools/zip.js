const AdmZip = require('adm-zip');
const log = require('fancy-log');

const zip = new AdmZip();

const appName = process.env.npm_package_name;
const version = process.env.npm_package_version;
const platform = process.env.PLATFORM;
const outputFileName = `${appName}_${platform}_${version}.zip`;

zip.addLocalFolder(`build/${platform}`);
zip.writeZip(outputFileName);
log.info(`Zip file created: ${outputFileName}`);
