package com.spiderwalker.app.models;

import lombok.Builder;
import lombok.EqualsAndHashCode;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
@EqualsAndHashCode(callSuper = false)
public class Boy extends Parent {

    public String playSoccer;
}
