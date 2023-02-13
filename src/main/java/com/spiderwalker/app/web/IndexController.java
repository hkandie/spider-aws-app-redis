package com.spiderwalker.app.web;

import com.spiderwalker.app.models.Person;
import com.spiderwalker.app.service.PersonService;
import org.apache.commons.lang3.RandomUtils;
import org.apache.commons.lang3.math.NumberUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;
import java.util.random.RandomGenerator;

@RestController
public class IndexController {
    @Autowired
    PersonService personService;
    @GetMapping(value = "/person", produces = "application/json")
    public ResponseEntity<List<Person>> health(@RequestParam String id) {

        return ResponseEntity.ok(personService.listPeople(id));
    }

    @GetMapping(value = "/person/{id}/me", produces = "application/json")
    public ResponseEntity<List<Person>> health100() throws SQLException {

        return ResponseEntity.ok(personService.giveMe());
    }

    @GetMapping(value = "/person/{id}",  produces = "application/json")
    public ResponseEntity health503(@PathVariable String id) {

        return ResponseEntity.status(RandomUtils.nextInt(400,599)).build();
    }
    @GetMapping(value = "/",  produces = "application/json")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("You have reached a working system");
    }
}
