package com.spiderwalker.app.service;

import com.spiderwalker.app.models.Person;
import com.spiderwalker.app.repository.PersonDataGenerator;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.retry.annotation.Backoff;
import org.springframework.retry.annotation.Retryable;
import org.springframework.stereotype.Service;

import java.sql.SQLException;
import java.time.Duration;
import java.time.Instant;
import java.util.List;
import java.util.concurrent.atomic.AtomicInteger;

@Service
@Slf4j
public class PersonService {
    private final PersonDataGenerator personDataGenerator;

    public PersonService(PersonDataGenerator personDataGenerator) {
        this.personDataGenerator = personDataGenerator;
    }
    AtomicInteger atomicInteger=new AtomicInteger();
    Instant  instant= Instant.now();

    @Cacheable(value = "listPeople", key="#id")
    public List<Person> listPeople(String id) {
        log.info("Heading to DB");
        return personDataGenerator.generatePersons(100);
    }

    @Cacheable(value = "giveMe")
    @Retryable(retryFor = {SQLException.class},
        maxAttempts = 6,
        backoff = @Backoff(delay = 1000, multiplier=3, maxDelay = 60000))
    public List<Person> giveMe() throws SQLException {
        int a=atomicInteger.incrementAndGet();
        log.info("Count: {} after {}",a, Duration.between(instant, Instant.now()).toSeconds());
        instant=Instant.now();
        if(a<6){
            throw new SQLException();
        }
        return personDataGenerator.generatePersons(a);
    }
}
