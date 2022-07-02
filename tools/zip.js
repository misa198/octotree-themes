const AdmZip = require('adm-zip');
const log4js = require('log4js');

const zip = new AdmZip();
const logger = log4js.getLogger();

const appName = process.env.npm_package_name;
const version = process.env.npm_package_version;
const platform = process.env.PLATFORM;
const outputFileName = `${appName}_${platform}_${version}.zip`;

zip.addLocalFolder(`build/${platform}`);
zip.writeZip(outputFileName);
logger.info(`Zip file created: ${outputFileName}`);
