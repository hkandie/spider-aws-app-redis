FROM amazoncorretto:11-alpine
WORKDIR /app
COPY target/spider-redis-0.0.2.jar /app/emrys-0.0.2.jar
COPY flyway.conf /app/flyway.conf
EXPOSE 9000
ENTRYPOINT ["java","-jar","/app/emrys-0.0.2.jar"]