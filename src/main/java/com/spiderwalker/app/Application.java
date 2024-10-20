package com.spiderwalker.app;

import lombok.extern.slf4j.Slf4j;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cache.annotation.EnableCaching;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;
import org.springframework.core.env.Environment;
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
        var applicationContext = application.run(args);
        Environment environment = applicationContext.getEnvironment();

        log.info("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        log.info("Successfully started: SPRING_PROFILES_ACTIVE: {} ", environment.getProperty("spring.profiles.active"));
        log.info("AR_READ_ONLY_USER: {} ", environment.getProperty("AR_READ_ONLY_USER"));
        log.info("AR_READ_ONLY_PASS: {} ", environment.getProperty("AR_READ_ONLY_PASS"));

        List<String> list = List.of("a", "b", "c");
        list.forEach(a -> {
            log.info("{}", a);
        });

    }

}
