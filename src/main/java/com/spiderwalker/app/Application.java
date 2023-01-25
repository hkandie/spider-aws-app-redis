package com.spiderwalker.app;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;

import java.util.concurrent.TimeUnit;

@Slf4j
@SpringBootApplication
@EnableCaching
public class Application {

    public static void main(String[] args) {
        log.info("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        System.setProperty("spring.profiles.active", "dev");
        SpringApplication application = new SpringApplication(Application.class);
        application.addListeners((ApplicationListener<ContextClosedEvent>) event -> {
            log.info("Shutdown process initiated...");
            try {
                Thread.sleep(TimeUnit.MINUTES.toMillis(5));
            } catch (InterruptedException e) {
                log.error("Exception is thrown during the ContextClosedEvent", e);
            }
            log.info("Graceful Shutdown is processed successfully");
        });
        application.run(args);
        log.info("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        log.info("Successfully started");
        log.info("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        log.info("AR_READ_ONLY_USER: {}", System.getProperty("AR_READ_ONLY_USER"));
        log.info("AR_READ_ONLY_PASS: {}", System.getProperty("AR_READ_ONLY_PASS"));

    }

}
