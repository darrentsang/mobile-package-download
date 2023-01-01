const AppInfoParser = require('app-info-parser')


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

//extractAppInfo('./data/packages/bitbar-ios-sample.ipa')
//extractAppInfo('./data/packages/calculator.ipa')

module.exports = { extractAppInfo}