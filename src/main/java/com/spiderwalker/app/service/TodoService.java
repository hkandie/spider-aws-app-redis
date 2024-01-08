package com.spiderwalker.app.service;

import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import com.spiderwalker.app.models.Todo;
import com.spiderwalker.app.repository.TodoGenerator;

import lombok.extern.slf4j.Slf4j;

@Service
@Slf4j
public class TodoService {
    TodoGenerator todoGenerator;

    public TodoService(TodoGenerator todoGenerator) {
        this.todoGenerator = todoGenerator;
    }

    @Cacheable(value = "todos")
    public List<Todo> listTodo() {
        log.info("Heading to DB");
        return todoGenerator.generateToto();
    }
}
