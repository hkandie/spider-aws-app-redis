package com.spiderwalker.app.service;

import com.github.javafaker.Faker;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class PersonDataGenerator {
    public List<Person> generatePersons(int no) {
        List<Person> personList = new ArrayList<>();
        for (int j = 0; j < no; j++) {
            Faker faker = new Faker();
            Person person = Person
                .builder()
                .email(faker.bothify(faker.internet().emailAddress()))
                .first(faker.name().firstName())
                .last(faker.name().firstName())
                .build();
            personList.add(person);
        }
        return personList;
    }
}
