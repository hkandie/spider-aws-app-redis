package com.emrys.growth.web;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class IndexController {
    @RequestMapping(value = "/health-check", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<String> health() {
        return ResponseEntity.ok("You have reached a working system");
    }
    @RequestMapping(value = "/", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("You have reached a working system");
    }
}
