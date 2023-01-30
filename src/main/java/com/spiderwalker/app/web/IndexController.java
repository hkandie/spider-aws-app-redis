package com.spiderwalker.app.web;

import com.spiderwalker.app.models.Person;
import com.spiderwalker.app.service.PersonService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class IndexController {
    @Autowired
    PersonService personService;
    @RequestMapping(value = "/person", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<List<Person>> health(@RequestParam String id) {

        return ResponseEntity.ok(personService.listPeople(id));
    }
    @RequestMapping(value = "/", method = RequestMethod.GET, produces = "application/json")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("You have reached a working system");
    }
}
