#### To release

Remember to generate new `keystore` file, by using the following command:

```
keytool -genkeypair -v -storetype PKCS12 -keystore <keystore_file_name>.keystore -alias <key_alias> -keyalg RSA -keysize 2048 -validity 10000
```

Update these environment variables in `android/gradle.properties`:

```env
MYAPP_UPLOAD_STORE_FILE=release.keystore
MYAPP_UPLOAD_KEY_ALIAS=checkly
MYAPP_UPLOAD_STORE_PASSWORD=123456
MYAPP_UPLOAD_KEY_PASSWORD=123456
```

Command to build APK file:

```sh
cd android
./gradlew clean
./gradlew assembleRelease
```