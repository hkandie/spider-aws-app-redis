FROM amazoncorretto:11-alpine
WORKDIR /app
COPY target/spider-redis-0.0.1.jar /app/emrys-0.0.1.jar
EXPOSE 9000
ENTRYPOINT ["java","-jar","/app/emrys-0.0.1.jar"]