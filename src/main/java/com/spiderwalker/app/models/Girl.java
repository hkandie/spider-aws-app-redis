package com.spiderwalker.app.models;

import lombok.Data;
import lombok.EqualsAndHashCode;

@Data
@EqualsAndHashCode(callSuper=false)
public class Girl extends Parent{
    public String playNetball;
}
