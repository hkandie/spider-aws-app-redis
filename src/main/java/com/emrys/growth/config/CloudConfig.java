package com.emrys.growth.config;


import com.emrys.growth.models.Message;
import lombok.Data;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.cloud.context.config.annotation.RefreshScope;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.ArrayList;
import java.util.List;

@Configuration
@Data
@RefreshScope
public class CloudConfig {
    List<String> message = new ArrayList<>();

    @Bean
    @ConfigurationProperties(prefix = "welcome.message")
    public List<String> setValues() {
        return message;
    }
}
