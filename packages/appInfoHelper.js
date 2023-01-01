const AppInfoParser = require('app-info-parser')
const Package = require('../models/package')


async function extractAppInfo(filePath) {
    const parser = new AppInfoParser(filePath);
    try {
        const result = await parser.parse()
        console.log('app info ----> ', result)
        console.log('app info lenght ----> ', JSON.stringify(result).length)
        return result
    }
    catch (err) {
        console.log('err ----> ', err)
        throw err
    }
}
function convertIOSAppInfoToPackage(appInfo) {
    return Package.build({
        platform: 'ios',
        versionName: appInfo.CFBundleShortVersionString,
        buildVersion: appInfo.CFBundleVersion,
        displayName: appInfo.CFBundleDisplayName,
        bundleIdentifier: appInfo.CFBundleIdentifier,
        icon: appInfo.icon
    })
}
function convertAndroidppInfoToPackage(appInfo) {
    return Package.build({
        platform: 'android',
        versionName: appInfo.versionName,
        buildVersion: appInfo.versionCode,
        displayName: appInfo.application.label[0],
        bundleIdentifier: appInfo.package,
        icon: appInfo.icon
    })
}

module.exports = { extractAppInfo, convertIOSAppInfoToPackage, convertAndroidppInfoToPackage }