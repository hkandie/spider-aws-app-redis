package com.emrys.growth.config;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.apache.logging.log4j.LogManager;
import org.apache.logging.log4j.Logger;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;



/**
 *
 * @author HKandie
 */
public class LogInterceptor implements HandlerInterceptor {

    public static Logger logger = LogManager.getLogger(LogInterceptor.class);


    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
            throws Exception {
        String requestIp = request.getRemoteHost();        // Comment from here


        logger.info("INCOMING REQUEST URI: [{}] Token[{}]  [{}] [{}] ", requestIp, request.getRequestURI(), request.getContextPath());

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, //
                           Object handler, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, //
            Object handler, Exception ex) throws Exception {

    }

}
