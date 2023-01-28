package com.spiderwalker.app.config;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;

@Component
@Slf4j
public class ClearCacheTask {
    @Autowired
    private CacheManager cacheManager;

    @Scheduled(fixedRate = 60 * 1000 * 10) // reset cache every hr, with delay of 1hr after app start
    public void reportCurrentTime() {
        log.info("Cleaning up cache");
        cacheManager.getCacheNames()
                .parallelStream().forEach(name -> cacheManager.getCache(name).clear());
    }
}
