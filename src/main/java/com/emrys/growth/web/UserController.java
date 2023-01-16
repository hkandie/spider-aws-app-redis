package com.emrys.growth.web;

import com.emrys.growth.models.Oauth2Client;
import com.emrys.growth.models.Oauth2ClientCreate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {
    @Autowired
    Oauth2ClientService oauth2ClientService;

    @PostMapping(produces = "application/json")
    public ResponseEntity<String> createUser(@RequestBody Oauth2ClientCreate oauth2ClientCreate) {
        return ResponseEntity.ok("You have reached a working system");
    }
}
