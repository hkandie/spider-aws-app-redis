package com.emrys.growth.config;

import com.emrys.growth.error.CustomCacheErrorHandler;
import org.springframework.cache.annotation.CachingConfigurer;
import org.springframework.cache.annotation.CachingConfigurerSupport;
import org.springframework.cache.interceptor.CacheErrorHandler;
import org.springframework.context.annotation.Configuration;

@Configuration
public class CachingConfiguration implements CachingConfigurer {
    @Override
    public CacheErrorHandler errorHandler() {
        return new CustomCacheErrorHandler();
    }

}