const AppInfoParser = require('app-info-parser')


function extractAppInfo(filePath) {
    const parser = new AppInfoParser(filePath);
    parser.parse().then(result => {
        console.log('app info ----> ', result)
        console.log('app info lenght ----> ', JSON.stringify(result).length)
        //console.log('icon base64 ----> ', result.icon)
    }).catch(err => {
        console.log('err ----> ', err)
    })
}

//extractAppInfo('./data/packages/bitbar-ios-sample.ipa')
extractAppInfo('./data/packages/bitbar-sample-app.apk')
//extractAppInfo('./data/packages/calculator.ipa')