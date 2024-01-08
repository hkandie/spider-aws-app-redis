package com.spiderwalker.app;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.scheduling.annotation.EnableScheduling;

import java.util.List;
import java.util.concurrent.TimeUnit;

@Slf4j
@SpringBootApplication
@EnableCaching
@EnableScheduling
public class Application {

    public static void main(String[] args) {
        SpringApplication application = new SpringApplication(Application.class);
        application.addListeners((ApplicationListener<ContextClosedEvent>) event -> {
            log.info("Shutdown process initiated...");
            try {
                Thread.sleep(TimeUnit.SECONDS.toMillis(5));
            } catch (InterruptedException e) {
                log.error("Exception is thrown during the ContextClosedEvent", e);
            }
            log.info("Graceful Shutdown is processed successfully");
        });
        application.run(args);
        log.info("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        log.info("Successfully started: SPRING_PROFILES_ACTIVE: {} ", System.getProperty("SPRING_PROFILES_ACTIVE"));

        List<String> list = List.of("a", "b", "c");
        list.forEach(a -> {
            log.info("{}", a);
        });

    }

}
