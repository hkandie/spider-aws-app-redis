FROM amazoncorretto:17-alpine
WORKDIR /app
COPY target/spider-redis-0.0.3.jar /app/app.jar
COPY flyway.conf /app/flyway.conf
EXPOSE 8443
ENTRYPOINT ["java","-jar","/app/app.jar"]