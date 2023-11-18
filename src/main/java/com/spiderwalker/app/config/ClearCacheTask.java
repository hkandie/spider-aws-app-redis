package com.spiderwalker.app.config;

import org.springframework.cache.CacheManager;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.Cache; // Add this import statement

@Component
@Slf4j
public class ClearCacheTask {
    private final CacheManager cacheManager;

    public ClearCacheTask(CacheManager cacheManager) {
        this.cacheManager = cacheManager;
    }


    @Scheduled(fixedRate = 60 * 1000 * 10)
    public void reportCurrentTime() {
        log.info("Cleaning up cache");
        cacheManager.getCacheNames()
                .parallelStream().forEach(name -> {
                    Cache cache = cacheManager.getCache(name);
                    if (cache != null) {
                        cache.clear();
                    }
                });
    }
}
