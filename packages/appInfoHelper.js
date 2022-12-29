const AppInfoParser = require('app-info-parser')


function extractAppInfo(filePath) {
    const parser = new AppInfoParser(filePath);
    parser.parse().then(result => {
        console.log('app info ----> ', JSON.stringify(result))
        console.log('app info lenght ----> ', JSON.stringify(result).length)
    }).catch(err => {
        console.log('err ----> ', err)
    })
}

//extractAppInfo('./data/packages/bitbar-ios-sample.ipa')
//extractAppInfo('./data/packages/calculator.ipa')