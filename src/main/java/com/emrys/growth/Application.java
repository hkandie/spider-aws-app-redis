package com.emrys.growth;

import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.ApplicationListener;
import org.springframework.context.event.ContextClosedEvent;

import java.util.concurrent.TimeUnit;

@SpringBootApplication
@RefreshScope
public class Application {
    public static Logger logger = LogManager.getLogger(Application.class);
    public static void main(String[] args) {
        logger.info("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        SpringApplication application = new SpringApplication(Application.class);
        application.addListeners((ApplicationListener<ContextClosedEvent>) event -> {
            logger.info("Shutdown process initiated...");
            try {
                Thread.sleep(TimeUnit.MINUTES.toMillis(5));
            } catch (InterruptedException e) {
                logger.error("Exception is thrown during the ContextClosedEvent", e);
            }
            logger.info("Graceful Shutdown is processed successfully");
        });
        application.run(args);
        logger.info("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        logger.info("Successfully started");
        logger.info("XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX");
        logger.info("AR_READ_ONLY_USER: {}", System.getProperty("AR_READ_ONLY_USER"));
        logger.info("AR_READ_ONLY_PASS: {}", System.getProperty("AR_READ_ONLY_PASS"));

    }

}
