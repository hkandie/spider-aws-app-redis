package com.spiderwalker.app.web;

import com.spiderwalker.app.models.Person;
import com.spiderwalker.app.service.PersonService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.rng.UniformRandomProvider;
import org.apache.commons.rng.simple.RandomSource;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.SQLException;
import java.util.List;

@RestController
@Slf4j
public class IndexController {
    private PersonService personService;
    UniformRandomProvider rng = RandomSource.XO_RO_SHI_RO_128_PP.create();
    public IndexController(PersonService personService) {
        this.personService = personService;
    }

    @GetMapping(value = "/person", produces = "application/json")
    public ResponseEntity<List<Person>> health(@RequestParam String id) {
        return ResponseEntity.ok(personService.listPeople(id));
    }

    @GetMapping(value = "/person/{id}/me", produces = "application/json")
    public ResponseEntity<List<Person>> health100() throws SQLException {
        return ResponseEntity.ok(personService.giveMe());
    }

    @GetMapping(value = "/person/{id}",  produces = "application/json")
    public ResponseEntity<Integer> health503(@PathVariable int lower) {
        return ResponseEntity.status(rng.nextInt(lower, 599)).build();
    }

    @GetMapping(value = "/person/{id}/health",  produces = "application/json")
    public ResponseEntity<Integer> health200(@PathVariable String id) {
        log.info("Some request {}", id);
        return ResponseEntity.status(200).build();
    }
    @GetMapping(value = "/",  produces = "application/json")
    public ResponseEntity<String> index() {
        return ResponseEntity.ok("You have reached a working system");
    }
}
