package com.spiderwalker.app.config.web;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import java.util.Collection;
import java.util.Enumeration;

@Slf4j
public class LogInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler)
        throws Exception {
        log.info("START REQUEST: {} {} {}", request.getMethod(), request.getRequestURI() ,request.getHttpServletMapping());
        Enumeration<String> c= request.getParameterNames();
        while (c.hasMoreElements()){
            String a=c.nextElement();
            log.info("{}",a);
        }

        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, //
                           Object handler, ModelAndView modelAndView) throws Exception {
    }

    @Override
    public void afterCompletion(HttpServletRequest request, HttpServletResponse response, //
                                Object handler, Exception ex) throws Exception {

        log.info("END REQUEST: {} {} {}  ", request.getMethod(), request.getRequestURI(), response.getStatus());

    }

}