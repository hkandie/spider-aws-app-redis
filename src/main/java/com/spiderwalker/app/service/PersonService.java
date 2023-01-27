package com.spiderwalker.app.service;

import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@Slf4j
public class PersonService {
    @Autowired
    PersonDataGenerator personDataGenerator;

    @Cacheable(value = "listPeople")
    public List<Person> listPeople() {
        log.info("Heading to DB");
        return personDataGenerator.generatePersons(10);
    }
}
