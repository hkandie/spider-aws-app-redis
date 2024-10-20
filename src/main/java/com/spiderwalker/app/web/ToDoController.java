package com.spiderwalker.app.web;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import com.spiderwalker.app.models.Todo;
import com.spiderwalker.app.service.TodoService;

@RestController
public class ToDoController {
    TodoService todoService;

    public ToDoController(TodoService todoService) {
        this.todoService = todoService;
    }

    @GetMapping("/todos")
    public List<Todo> list() {

        return todoService.listTodo();
    }

}
