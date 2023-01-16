package com.emrys.growth.error;

import com.emrys.growth.config.LogInterceptor;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.cache.Cache;
import org.springframework.cache.interceptor.CacheErrorHandler;

public class CustomCacheErrorHandler implements CacheErrorHandler {

    public static Logger logger = LogManager.getLogger(LogInterceptor.class);

    @Override
    public void handleCacheGetError(RuntimeException e, Cache cache, Object o) {
        logger.error("Error while getting cache from redis");
    }

    @Override
    public void handleCachePutError(RuntimeException e, Cache cache, Object o, Object o1) {
        logger.error("Error while putting cache from redis",e.getMessage());
        logger.error(e.getMessage());
    }

    @Override
    public void handleCacheEvictError(RuntimeException e, Cache cache, Object o) {
        logger.error("Error while evict cache from redis");
    }

    @Override
    public void handleCacheClearError(RuntimeException e, Cache cache) {
        logger.error("Error while clearing cache from redis");
    }
}