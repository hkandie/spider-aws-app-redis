#keytool -genkeypair -alias springboot -keyalg RSA -keysize 4096 -storetype JKS -keystore springboot.jks -validity 3650 -storepass password
#keytool -genkeypair -alias springboot -keyalg RSA -keysize 4096 -storetype PKCS12 -keystore springboot.p12 -validity 3650 -storepass password
#keytool -list -v -keystore springboot.jks
#keytool -list -v -keystore springboot.p12
#keytool -importkeystore -srckeystore springboot.jks -destkeystore springboot01.p12 -deststoretype pkcs12
#keytool -import -alias springboot -file myCertificate.crt -keystore springboot.p12 -storepass password
mv springboot.p12 ../src/main/resources/