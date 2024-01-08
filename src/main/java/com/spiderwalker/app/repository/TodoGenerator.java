package com.spiderwalker.app.repository;

import java.util.List;

import org.springframework.stereotype.Component;
import org.springframework.web.reactive.function.client.WebClient;

import com.spiderwalker.app.models.Todo;

@Component
public class TodoGenerator {
    public List<Todo> generateToto() {
        WebClient webClient = WebClient.create("https://jsonplaceholder.typicode.com/todos");
        return webClient.get().retrieve().bodyToFlux(Todo.class).collectList().block();
    }
}
