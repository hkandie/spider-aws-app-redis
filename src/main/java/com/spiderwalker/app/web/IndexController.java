package com.spiderwalker.app.web;

import com.spiderwalker.app.models.Person;
import com.spiderwalker.app.service.PersonService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.RandomUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@Slf4j
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
    public ResponseEntity health503(@PathVariable int lower) {

        return ResponseEntity.status(RandomUtils.nextInt(lower,599)).build();
    }
    @GetMapping(value = "/person/{id}/health",  produces = "application/json")
    public ResponseEntity health200(@PathVariable String id) {
        log.info("Some request {}", id );
        return ResponseEntity.status(200).build();
    }
    @GetMapping(value = "/",  produces = "application/json")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("You have reached a working system");
    }
}
