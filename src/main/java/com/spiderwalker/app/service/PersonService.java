package com.spiderwalker.app.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class PersonService {
    @Autowired
    PersonDataGenerator personDataGenerator;

    @Cacheable(value = "listPeople")
    public List<Person> listPeople() {
        return personDataGenerator.generatePersons(10);
    }
}
