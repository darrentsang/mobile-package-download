# Mobile Package Download

Mobile Package Download contains functions to install Android and iOS application via web. Below functions included in this projects
- Overview page for listing the uploaded Android & iOS application
- Details page to listing all the application uploaded in same kind of mobile application
- Supported to control user access to inquiry, download and upload function
- Supported to download APK file for Androind
- Supported to install IPA file for iOS
- Supported to upload APK and IPA file via API
- Supported to two roles as USER and ADMIN. USER eligible to inquiry and download apk & ipa file. ADMIN eligible to upload apk & ipa file to server
- Applied JWT to maintain the login session  


# Getting Started

```
 # clone source from git

 # init sqllife 
 $ npm run tableInit

 # assign certification for SSL
 # replace "cert/RootCA.crt" and "cert/RootCA.pem" by your own certification

 # start for development environment 
 $ npm run dev
```

Login the page by different role belows:

|User Role|Username|Password|Description| 
|---|---|---|---|
|User|user|123456|For download and install only|
|Admin|admin|123456|For upload ipa and apk|
|Super|super|123456|Owning the both access for User and Admin role| 