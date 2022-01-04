FROM amazoncorretto:11-alpine
WORKDIR /app
COPY target/emrys-0.0.4.jar /app/emrys-0.0.4.jar
COPY application.properties /app/application.properties
EXPOSE 9000
ENTRYPOINT ["java","-jar","/app/emrys-0.0.4.jar"]