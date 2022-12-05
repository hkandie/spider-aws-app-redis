package com.emrys.growth.config;


import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@Data
@RefreshScope
public class CloudConfig {

    @Value("${db-username}")
    String username;
    @Value("${db-password}")
    String password;
    @Value("${db-challenge}")
    String challenge;



}
