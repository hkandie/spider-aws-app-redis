package com.spiderwalker.app.models;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Todo {
    private int userId;
    private int id;
    private String title;
    private boolean completed;
    
}
